

exports.addMessage = async (req, res) => {
    try {
        const user =  req.user;
        const {message} = req.body;
        await user.createMessage({message:message});
        res.json({sucsess:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}