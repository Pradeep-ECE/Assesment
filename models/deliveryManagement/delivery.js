module.exports=(db, Sequelize) => {
    let Model =db.define('delivery',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        storeId :{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        name :{
            type:Sequelize.STRING,
            allowNull:false,
            // unique:true
    
        },
        
        minimumSubtotal:{
            type:Sequelize.INTEGER,
            allowNull:false
    
        },
        shippingType : {
            type:Sequelize.ENUM("subtotal","subtotal + tax"),
            allowNull:false

        },
        amountType:{
            type:Sequelize.ENUM("amount","percentage"),
            allowNull:false

        },
        isDeleted:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        isActive:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },
    {
        tableName:'delivery',
        underscored:false,
        timestamps:true,
        schema: "deliveryManagement"
    }
);
Model.associate=async function(models){
    this.delivery=this.hasOne(models.shippingConfig,{foreignKey:'deliveryId'});
   
}
    return Model;
}
