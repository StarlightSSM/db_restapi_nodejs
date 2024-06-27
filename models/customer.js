const {Model, DataTypes} = require("sequelize");

class Customer extends Model {
    static initiate(sequelize) {
        return Customer.init({
            custid:{type:DataTypes.INTEGER, primaryKey:true},
            name:{type:DataTypes.STRING(40), allowNull:false},
            address:{type:DataTypes.STRING(50), allowNull:false},
            phone:{type:DataTypes.STRING(20), allowNull:false}
        },{sequelize, modelName:"Customer", tableName:"customer", timestamps:false})
    }
    static associate(db){
        Customer.hasMany(db.Order, {foreignKey:"custid"})
    }
}
module.exports = Customer;