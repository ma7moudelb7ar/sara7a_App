


export const validation = (Schema) => {
    
    return (req,res,next) => {
        let validationError = []
        
        for (const key of Object.keys(Schema)) {
            
        const data = Schema[key].validate(req[key], {abortEarly: false})
        if (data?.error) {
            validationError.push(data?.error?.details)
        }
        }
        if (validationError.length) {
        return res.status(400).json({ message: "validation Error", errors: validationError });

            // throw new Error ("validation Error " , {cause :400} , )
        }

        return next()
    }
}