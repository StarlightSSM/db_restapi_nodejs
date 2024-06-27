// bookid(pri, int), bookname(varchar(40)).
// publisher(varchar(40)). price(int) 

const {Model, DataTypes} = require("sequelize");

class User extends Model {
    static initiate(sequelize) {
        return FRCT_user_tbl.init({
            // 식별키
            FRCT_user_id:{type:DataTypes.INTEGER, autoIncrement:true, allowNull:false},
            FRCT_user_pwd:{type:DataTypes.STRING(20), allowNull:false},
            FRCT_user_name:{type:DataTypes.STRING(20), allowNull:false},
            FRCT_user_gender:{type:Sequelize.ENUM('male', 'female'),
                allowNull: false,
                defaultValue: 'male'},
            FRCT_user_hpNum:{type:DataTypes.STRING(40), allowNull:false},
            FRCT_user_email:{type:DataTypes.STRING(40), primaryKey:true, allowNull:false},
            FRCT_user_grade_code:{type:Sequelize.ENUM('personal', 'business'),
                allowNull: false,
                defaultValue: 'personal'},
            FRCT_user_zipcode:{type:DataTypes.STRING(40), allowNull:false},
            FRCT_user_address:{type:DataTypes.STRING(40), allowNull:false},
            FRCT_user_address_detail:{type:DataTypes.STRING(100), allowNull:false},
            FRCT_user_del_yn:{type:DataTypes.STRING(40), allowNull:false},
            FRCT_user_profile_txt:{type:DataTypes.STRING(100), allowNull:false},
            FRCT_user_profile_picture:{type:DataTypes.STRING, allowNull:false}, // x, url
            FRCT_user_profile_portfolio:{type:DataTypes.STRING(40), allowNull:false}, // x
            FRCT_user_cash:{type:DataTypes.DECIMAL, allowNull:false},
            FRCT_user_created_at:{type:DataTypes.DATE, allowNull:false},
            FRCT_user_updated_at:{type:DataTypes.DATE, allowNull:false},
        },{sequelize, modelName:"User", tableName:"FRCT_user_tbl", timestamps:false})
    }
    static associate(db){
        // User.hasMany(db.Order, {foreignKey:"bookid"}) // 설정 필요
    }
}
module.exports = User;