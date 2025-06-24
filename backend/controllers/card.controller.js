import Card from '../models/card.model.js';


export const createCard = async (req, res) => {
    const { image, heading, description ,page ,section ,blog ,link,header,footer } = req.body;
    const userId = req.user.id; // Assume `req.user` is set by `authenticate` middleware

    try {
        const newCard = new Card({
            image,
            heading,
            description,
            page,
            section,
            blog,
            link,
            header,
            footer,
            createdBy: userId,
        });

        await newCard.save();

        res.status(201).json({
            message: 'Card created successfully',
            card: newCard,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create card', error: error.message });
    }
};

export const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find().populate('createdBy','page section');
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cards', error: error.message });
    }
};  

export const deleteCard = async (req, res) => {
    const cardId = req.params.id;
    try {
        const deletedCard = await Card.findByIdAndDelete(cardId);
        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete card', error: error.message });
    }
};

export const updateCard = async (req, res) => {
    const cardId = req.params.id;
    try {
        const updatedData = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
        
        if (!updatedData) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ message: 'Card updated successfully', card: updatedData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update card', error: error.message });
    }
};

export const getCardsByPage = async (req, res) => {
    const {page} = req.params;
    try {
        const cards = await Card.find({page});
        if (!cards) {
            return res.status(404).json({ message: 'Cards not found' });
        }
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch card', error: error.message });
    }
};

export const getCardsByAdress = async (req, res) => {
    const {page,section} = req.params;
    try {
        const cards = await Card.find({page,section});
        if (!cards) {
            return res.status(404).json({ message: 'Cards not found'});

        }

        res.status(200).json(cards);
        
    } catch (error) {
        res.status(500).json({ message: 'Faild to fetch cards'});
    }
}