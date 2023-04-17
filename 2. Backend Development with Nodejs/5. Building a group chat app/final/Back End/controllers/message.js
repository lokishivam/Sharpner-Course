const Message = require('../models/message');

exports.addMessage = async (req, res) => {
    try {
        const user =  req.user;
        const {message} = req.body;
        await user.createMessage({sender:user.name, message:message});
        res.json({sucsess:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        console.log('MMMMMMMMMMM',messages);
        res.json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}
