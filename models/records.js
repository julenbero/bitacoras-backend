"use strict";

var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    let Records = sequelize.define('Records', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        estacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tecnologia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        banda: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipot: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estadoi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estadof: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        exitoso: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        standby: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prorroga: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: true,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: false,

            // define the table's name
            tableName: 'records',

            // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
            // to the model and throw an OptimisticLockingError error when stale instances are saved.
            // Set to true or a string with the attribute name you want to use to enable.
            version: false
        });

    User.associate = models => {
        //asociar los roles

        Records.belongsTo(models.User, {
            foreignKey: 'user'
        });

        Records.hasMany(models.Typesw, {
            as: 'typesw',
            foreignKey: 'records'
        });
    };

    return Records;
};