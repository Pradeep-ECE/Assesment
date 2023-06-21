module.exports=(db, Sequelize) => {
    let Model =db.define('shippingConfig',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        from :{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        to :{
            type:Sequelize.INTEGER,
            allowNull:false
    
        },
        
        deliveryId:{
            type:Sequelize.INTEGER,
            allowNull:false
    
        },
        isDeleted : {
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false

        },
        amount:{
            type:Sequelize.INTEGER,
            allowNull:false,
        }
    },
    {
        tableName:'shippingConfig',
        underscored:false,
        timestamps:true,
        schema: "deliveryManagement"
    }
);
Model.associate=async function(models){
    // this.deliveryId=this.belongsTo(models.Delivery,{foreignKey:'deliveryId'});
    this.deliveryId=this.belongsTo(models.delivery,{foreignKey:'deliveryId'});
   
   
}
    return Model;
}
