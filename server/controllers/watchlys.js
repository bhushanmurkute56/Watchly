import Watchly from "./../models/watchly.js";

const getAllWatchly = async (req, res) => {
    const watchlyList = await Watchly.find();

    res.json({
        success: true,
        data: watchlyList,
        message: "All Watchly entries retrieved successfully"
    });
}

const postWatchly = async (req, res) => {
    console.log(`Body Received`, req.body);

    const { 
        title, 
        description, 
        images, 
        category, 
        director, 
        year, 
        language,
    rating } = req.body;

    if (!title || !description || !images || !category || !director || !year || !language || !rating) {
        res.status(400).json({ 
            success: false,
            data : null,
            message : "All fields are required"
        });
    }
    try {
        const newWatchly = new Watchly({
            title,
            description,
            images,
            category,
            director,
            year,
            language,
            rating,
        });

    const savedMovie = await newWatchly.save();

        res.status(201).json({
            success: true,
            data: savedMovie,
            message: "Watchly created successfully"
        });
    } 
    catch (error) {
        console.error("Error creating Watchly entry:", error);
        res.status(400).json({
            success: false,
            data: null,
            message: "Error adding watchly : " + error.message
        });
    }
};

const getWatchlyById = async (req, res) => {
    const { id } = req.params;
     try {
        const watchly = await Watchly.findById(id);

        if(watchly){
            return res.json({
                success: true,
                data: watchly,
                message: "Watchly entry retrieved successfully"
            });
        }
        else{
            return res.status(404).json({
                success: false,
                data: null,
                message: "Watchly entry not found"
            });
        }
     } catch (error) {
        console.error("Error retrieving Watchly entry:", error);
        return res.status(400).json({
            success: false,
            data: null,
            message: "Error retrieving Watchly entry: " + error.message
        });
     }
};

const getWatchlySearch = async (req, res) => {
    const {q} = req.query;

    const watchlys = await Watchly.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
            { director: { $regex: q, $options: "i" } },
        ]
    });
    if(watchlys.length === 0){
        return res.status(404).json({
            success: false,
            data: null,
            message: "No Watchly entries found matching the search criteria"
        });
    }
    res.json({
        success: true,
        data: watchlys,
        message: "Watchly entries retrieved successfully"
    });
}

const updateWatchlyById = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        images,
        category,
        director,
        year,
        language,
        rating
    } = req.body;

    await Watchly.findByIdAndUpdate(id, {
        title,
        description,
        images,
        category,
        director,
        year,
        language,
        rating
    });

    const updatedWatchly = await Watchly.findById(id);

    return res.json({
        success: true,
        data: updatedWatchly,
        message: "Watchly entry updated successfully"
    });
}

const putWatchlyRatingById = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    if(rating < 0 || rating > 5){
        return res.status(400).json({
            success: false,
            data: null,
            message: "Rating must be between 0 and 5"
        });
    }

    await Watchly.updateOne({ _id: id }, { rating });

    const updatedWatchly = await Watchly.findById(id);

    return res.json({
        success: true,
        data: updatedWatchly,
        message: "Watchly rating updated successfully"
    })

}    
    
    const deleteWatchlyById = async (req, res) => {
    try {
        const { id } = req.params;

        await Watchly.deleteOne({_id: id});

        return res.json({
            success: true,
            data: null,
            message: "Watchly entry deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting Watchly entry:", error);
        return res.status(400).json({
            success: false,
            data: null,
            message: "Error deleting Watchly entry: " + error.message
        });
    }
    };

export {
    getAllWatchly,
    postWatchly,
    getWatchlyById,
    getWatchlySearch,
    putWatchlyRatingById,
    updateWatchlyById,
    deleteWatchlyById,
};