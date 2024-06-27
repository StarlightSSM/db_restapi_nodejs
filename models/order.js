const {Model, DataTypes} = require("sequelize");

class Project extends Model {
    static initiate(sequelize) {
        return FRCT_projects_tbl.init({
            orderid:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
            custid:{type:DataTypes.INTEGER, allowNull:false},
            bookid:{type:DataTypes.INTEGER, allowNull:false},
            saleprice:{type:DataTypes.INTEGER, allowNull:false},
            orderdate:{type:DataTypes.DATE, allowNull:false}
        },{sequelize, modelName:"Project", tableName:"FRCT_projects_tbl", timestamps:false})
    }
    static associate(models){
        this.belongsTo(models.User, {foreignKey:'FRCT_user_id'});
    }
}
module.exports = Project;