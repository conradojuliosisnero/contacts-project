import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import {
  VALIDATION_MESSAGES,
  VALIDATION_LIMITS,
} from "../constants/messages.js";
import { REGEX_PATTERNS } from "../constants/regex.js";

const Contacto = sequelize.define(
  "Contacto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(VALIDATION_LIMITS.NOMBRE_MAX),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: VALIDATION_MESSAGES.NOMBRE_REQUERIDO,
        },
        len: {
          args: [VALIDATION_LIMITS.NOMBRE_MIN, VALIDATION_LIMITS.NOMBRE_MAX],
          msg: VALIDATION_MESSAGES.NOMBRE_LONGITUD,
        },
      },
    },
    email: {
      type: DataTypes.STRING(VALIDATION_LIMITS.EMAIL_MAX),
      allowNull: false,
      unique: {
        msg: VALIDATION_MESSAGES.EMAIL_DUPLICADO,
      },
      validate: {
        notEmpty: {
          msg: VALIDATION_MESSAGES.EMAIL_REQUERIDO,
        },
        isEmail: {
          msg: VALIDATION_MESSAGES.EMAIL_INVALIDO,
        },
      },
    },
    telefono: {
      type: DataTypes.STRING(VALIDATION_LIMITS.TELEFONO_MAX),
      allowNull: true,
      validate: {
        is: {
          args: REGEX_PATTERNS.TELEFONO,
          msg: VALIDATION_MESSAGES.TELEFONO_FORMATO,
        },
        len: {
          args: [0, VALIDATION_LIMITS.TELEFONO_MAX],
          msg: VALIDATION_MESSAGES.TELEFONO_LONGITUD,
        },
      },
    },
  },
  {
    tableName: "contactos",
    timestamps: true,
    createdAt: "creado_en",
    updatedAt: "actualizado_en",
  },
);

export default Contacto;
