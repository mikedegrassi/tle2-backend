const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Stats = sequelize.define("stats", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pace: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pass: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shot: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dribble: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defense: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    physical: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = Stats;