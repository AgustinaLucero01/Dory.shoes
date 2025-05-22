import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./doryShoes.db"
})

export default sequelize;