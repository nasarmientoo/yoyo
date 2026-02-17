import {serverSupabase} from "~/server/utils/supabaseClient.js";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const supabase = serverSupabase(config)

    //reads the body of the request
    const body = await readBody(event)

    //If some of the fields are not correctly compiled, return error to the client
    if (!body.fullname || !body.email || !body.message) {
        return {
            success: false,
            error: 'Missing required field'
        }
    }

    const { error } = await supabase
        .from('Requests')
        .insert([{
            fullname: body.fullname,
            email: body.email,
            text: body.message
        }])

    if (error) {
        return {
            success: false,
            error: error.message,
        }
    }

    return {
        success: true,
    }
})