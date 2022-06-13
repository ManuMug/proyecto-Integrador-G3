module.exports = (sequelize, DataTypes) => {
    let alias = 'Users'
    let cols = {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        direccion: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING(250),
        },
    }
    let config = {
        tableName: 'users',
        timestamps: false
    }
    let User = sequelize.define(alias, cols, config)
    /* User.associate = function (models) {
        User.hasMany(models.Products, {
            as: "Products",
            foreingKey: 'idCompra',
            through: "compra"
        })
    } */
    return User
}