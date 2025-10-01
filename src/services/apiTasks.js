import supabase from "./supabase"

export async function addTask({title , reward_points , description , category}){
    const {data: user} = await supabase.auth.getUser();
    if(!user){
        throw new Error("برجاء تسجيل الدخول اولا لاضافة مهمة");
    }
    const {data , error} = await supabase.from("tasks").insert([
        {
            title: title,
            reward_points: reward_points,
            description: description,
            category: category,
            user_id: user.user.id
        }
    ]).select().single();

    if(error){
        throw new Error(error.message);
    }

    return data;
}

export async function getUserTasks(){
    const {data: user} = await supabase.auth.getUser();
    if(!user){
        throw new Error("برجاء تسجيل الدخول اولا لعرض المهام");
    }

    const {data: tasks , error: tasksError} = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.user.id)
        .order("created_at", { ascending: false });

    if(tasksError){
        throw new Error(tasksError.message);
    }

    const today = new Date().toISOString().split('T')[0];
    const {data: completions , error: completionsError} = await supabase
        .from("task_compeletion")
        .select("*")
        .eq("user_id", user.user.id)
        .gte("date", today + "T00:00:00.000Z")
        .lte("date", today + "T23:59:59.999Z");

    if(completionsError){
        throw new Error(completionsError.message);
    }

    const completionMap = new Map();
    (completions || []).forEach(comp => {
        completionMap.set(comp.task_id, comp.isCompleted);
    });
    const tasksWithCompletion = tasks.map(task => ({
        ...task,
        done: completionMap.get(task.id) || false
    }));

    return tasksWithCompletion;
}

export async function checkTaskCompletion({task_id , isCompleted , date}){
    const {data: user} = await supabase.auth.getUser();
    if(!user){
        throw new Error("برجاء تسجيل الدخول اولا لعرض المهام");
    }

    const today = new Date().toISOString().split('T')[0];
    const {data: existingCompletion} = await supabase
        .from("task_compeletion")
        .select("*")
        .eq("task_id", task_id)
        .eq("user_id", user.user.id)
        .gte("date", today + "T00:00:00.000Z")
        .lte("date", today + "T23:59:59.999Z")
        .single();

    if(existingCompletion){
        if(!isCompleted){
            const {error} = await supabase
                .from("task_compeletion")
                .delete()
                .eq("id", existingCompletion.id);

            if(error){
                throw new Error(error.message);
            }
            return { deleted: true };
        } else {
            const {data, error} = await supabase
                .from("task_compeletion")
                .update({ isCompleted: isCompleted })
                .eq("id", existingCompletion.id)
                .select()
                .single();

            if(error){
                throw new Error(error.message);
            }
            return data;
        }
    } else {
        const {data , error} = await supabase.from("task_compeletion").insert([
            {
                task_id: task_id,
                isCompleted: isCompleted,
                user_id: user.user.id,
                date: date
            }
        ]).select().single();

        if(error){
            throw new Error(error.message);
        }

        return data;
    }
}

export async function deleteTask(task_id){
    const {data: user} = await supabase.auth.getUser();
    if(!user || !user.user){
        throw new Error("يجب عليك تسجيل الدخول لحذف المهام");
    }

    // أولاً: حذف جميع completions الخاصة بهذه المهمة
    const {error: completionError} = await supabase
        .from("task_compeletion")
        .delete()
        .eq("task_id", task_id)
        .eq("user_id", user.user.id);

    if(completionError){
        throw new Error(completionError.message);
    }

    // ثانياً: حذف المهمة نفسها
    const {data, error} = await supabase
        .from("tasks")
        .delete()
        .eq("id", task_id)
        .eq("user_id", user.user.id); // للأمان: المستخدم يحذف مهامه بس

    if(error){
        throw new Error(error.message);
    }
    
    return data;
}