module.exports = (sequelize, DataTypes) => {
    let alias = 'Compras'
    let cols = {
        idCompra: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idUser: {
            type: DataTypes.STRING,
            foreingKey: true,
        },
        idProduct: {
            type: DataTypes.STRING,
            foreingKey: true,
        },
        fechaCompra: {
            type: DataTypes.DATE,
        },
    }
    let config = {
        tableName: 'compra',
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }
    let Compra = sequelize.define(alias, cols, config)
    /* Compra.associate = function (models) {
        Compra.belongsToMany(models.Users, {
            as: 'users',
            foreingKey: 'idProduct',
            otherKey: "idUsers",
            through: false
        })
    } */
    return Compra
}