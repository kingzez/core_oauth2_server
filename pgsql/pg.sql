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

 Date: 02/08/2018 18:23:25
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
-- Records of Client
-- ----------------------------
BEGIN;
INSERT INTO "public"."Client" VALUES ('ddaa155c-e528-42d3-9bc1-e66fdd125580', 'rmk', 'rmk', 'rmk', 't', 1533198354481, 1533198354487);
INSERT INTO "public"."Client" VALUES ('272474b4-2cd3-4107-bbe5-244427dc4e79', 'rmk', 'rmk', 'rmk', 't', 1533200688714, 1533200688719);
INSERT INTO "public"."Client" VALUES ('971dec6e-8b5a-4d63-860a-2b1ce7c52994', 'rmk', 'rmk', 'rmk', 't', 1533200750273, 1533200750278);
INSERT INTO "public"."Client" VALUES ('73d2709d-7a35-4d7b-9dcf-8aaec25ce64f', 'rmk', 'rmk', 'rmk', 't', 1533202332051, 1533202332058);
INSERT INTO "public"."Client" VALUES ('cb109c1f-3e9f-4dfd-b870-fff04b96577c', 'rmk', 'rmk', 'rmk', 't', 1533204799899, 1533204799904);
COMMIT;

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
-- Records of Passport
-- ----------------------------
BEGIN;
INSERT INTO "public"."Passport" VALUES ('43cce95c-f2b0-437e-9fdb-651946695143', 'admin', 'admin', 'admin@xiaoyun.com', 1533204799899, 1533204799983, '38bafec6-4723-4f9e-b7ff-2ee8d7d7c5b3');
COMMIT;

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
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO "public"."User" VALUES ('38bafec6-4723-4f9e-b7ff-2ee8d7d7c5b3', 'rmk@xiaoyun.com', NULL, NULL, 'http://xiaoyun.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1533204799899, 1533204799902);
COMMIT;

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


