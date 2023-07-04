const Cooker = require("./cooker")
const Schema = mongoose.Schema;
const HomeMadeFoodSchema = new Schema({
    cookerId: {
      type:  Schema.Types.ObjectId,
      ref: `Cooker`
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String
    },
    numberOfItem: {
      type: Number
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref:`Comments`
    }]
  });

module.exports = mongoose.model("Meals", HomeMadeFoodSchema)