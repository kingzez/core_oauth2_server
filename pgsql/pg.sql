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

 Date: 10/08/2018 15:12:08
*/


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
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" int8,
  "updatedAt" int8,
  "isDelete" bool NOT NULL
)
;
ALTER TABLE "public"."Passport" OWNER TO "w";

-- ----------------------------
-- Records of Passport
-- ----------------------------
BEGIN;
INSERT INTO "public"."Passport" VALUES ('43cce95c-f2b0-437e-9fdb-651946695143', 'admin', 'admin', 'admin@xiaoyun.com', 1533204799899, 1533204799983, 'f');
COMMIT;

-- ----------------------------
-- Primary Key structure for table Client
-- ----------------------------
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Passport
-- ----------------------------
ALTER TABLE "public"."Passport" ADD CONSTRAINT "Passports_pkey" PRIMARY KEY ("id");
