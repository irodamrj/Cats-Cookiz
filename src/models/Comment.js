const Cooker = require("./cooker")
const Customer = require("./customer")
const Schema = mongoose.Schema;
const CommentSchema = new Schema ({
    cusId: {
        type: Schema.Types.ObjectId,
        ref: `Customer`,
        required: true,
      },
      cookerId: {
        type:Schema.Types.ObjectId,
        ref: `Cooker`,
        required: true,
      },
      comments: {
        type: String
      },
      Time: {
        type: Date,
        default:Date.now
      },
    });

 module.exports = mongoose.model("Comment", CommentSchema);
