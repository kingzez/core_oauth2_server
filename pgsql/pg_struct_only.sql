/*
 Navicat Premium Data Transfer

 Source Server         : sso
 Source Server Type    : PostgreSQL
 Source Server Version : 100004
 Source Host           : localhost:5432
 Source Catalog        : sso-server
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100004
 File Encoding         : 65001

 Date: 02/08/2018 18:24:14
*/


-- ----------------------------
-- Table structure for AccessToken
-- ----------------------------
DROP TABLE IF EXISTS "public"."AccessToken";
CREATE TABLE "public"."AccessToken" (
  "id" uuid NOT NULL,
  "token" text COLLATE "pg_catalog"."default" NOT NULL,
  "passportId" uuid NOT NULL,
  "clientId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."AccessToken" OWNER TO "w";

-- ----------------------------
-- Table structure for AuthorizationCode
-- ----------------------------
DROP TABLE IF EXISTS "public"."AuthorizationCode";
CREATE TABLE "public"."AuthorizationCode" (
  "id" uuid NOT NULL,
  "passportId" uuid NOT NULL,
  "clientId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "redirectUri" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."AuthorizationCode" OWNER TO "w";

-- ----------------------------
-- Table structure for Client
-- ----------------------------
DROP TABLE IF EXISTS "public"."Client";
CREATE TABLE "public"."Client" (
  "id" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "clientId" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "clientSecret" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "isTrusted" bool,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."Client" OWNER TO "w";

-- ----------------------------
-- Table structure for Passport
-- ----------------------------
DROP TABLE IF EXISTS "public"."Passport";
CREATE TABLE "public"."Passport" (
  "id" uuid NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" int8,
  "updatedAt" int8,
  "userId" uuid
)
;
ALTER TABLE "public"."Passport" OWNER TO "w";

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "public"."User";
CREATE TABLE "public"."User" (
  "id" uuid NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "role" int4,
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "site" varchar(255) COLLATE "pg_catalog"."default",
  "company" varchar(255) COLLATE "pg_catalog"."default",
  "isDelete" bool,
  "inform" bool,
  "isCloseAuto" bool,
  "meta" varchar(255) COLLATE "pg_catalog"."default",
  "type" int4,
  "balance" int8,
  "discount" int4,
  "contracPics" varchar(255) COLLATE "pg_catalog"."default",
  "licensePics" varchar(255) COLLATE "pg_catalog"."default",
  "level" int4,
  "commission" float8,
  "reward" float8,
  "deposit" int8,
  "performance" int8,
  "status" bool,
  "creator" uuid,
  "parent" uuid,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."User" OWNER TO "w";

-- ----------------------------
-- Primary Key structure for table AccessToken
-- ----------------------------
ALTER TABLE "public"."AccessToken" ADD CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table AuthorizationCode
-- ----------------------------
ALTER TABLE "public"."AuthorizationCode" ADD CONSTRAINT "AuthorizationCode_clientId_key" UNIQUE ("clientId");

-- ----------------------------
-- Primary Key structure for table AuthorizationCode
-- ----------------------------
ALTER TABLE "public"."AuthorizationCode" ADD CONSTRAINT "AuthorizationCode_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Client
-- ----------------------------
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Passport
-- ----------------------------
ALTER TABLE "public"."Passport" ADD CONSTRAINT "Passports_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "public"."User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");


