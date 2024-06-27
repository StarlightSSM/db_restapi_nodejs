// bookid(pri, int), bookname(varchar(40)).
// publisher(varchar(40)). price(int) 

const {Model, DataTypes} = require("sequelize");

class User extends Model {
    static initiate(sequelize) {
        return FRCT_user_tbl.init({
            // 식별키
            FRCT_user_id:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true, allowNull:false},
            FRCT_user_email:{type:DataTypes.STRING(500), unique: unique, allowNull:false},
            FRCT_user_name:{type:DataTypes.STRING(50), allowNull:false},
            FRCT_user_password:{type:DataTypes.STRING(50), allowNull:false},
            FRCT_user_gender:{type:DataTypes.ENUM('male', 'female'),
                allowNull: false,
                defaultValue: 'male'},
            FRCT_user_hpNum:{type:DataTypes.STRING(13), allowNull:false},
            FRCT_user_profile_txt:{type:DataTypes.TEXT, allowNull:true},
            FRCT_user_profile_picture:{type:DataTypes.STRING(500), allowNull:true}, // url
            FRCT_user_profile_portfolio:{type:DataTypes.TEXT, allowNull:true},
            FRCT_user_zipcode:{type:DataTypes.STRING(10), allowNull:true},
            FRCT_user_address:{type:DataTypes.STRING(255), allowNull:true},
            FRCT_user_address_detail:{type:DataTypes.STRING(255), allowNull:true},
            FRCT_user_grade_code:{type:DataTypes.ENUM('personal', 'company'),
                allowNull: false,
                defaultValue: 'personal'},
            FRCT_is_deleted:{type:DataTypes.BOOLEAN, default:false},
            FRCT_user_created_at:{type:DataTypes.DATE, allowNull:true},
            FRCT_user_updated_at:{type:DataTypes.DATE, allowNull:true},
        },{sequelize, modelName:"User", tableName:"FRCT_user_tbl", timestamps:false})
    }
    static associate(db){
        // User.hasMany(db.Order, {foreignKey:"bookid"}) // 설정 필요
    }
}
module.exports = User;