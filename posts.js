/*
* @Author: Grace-Girl
* @Date:   2018-07-28 11:00:56
* @Last Modified by:   Grace-Girl
* @Last Modified time: 2018-07-28 11:20:19
*/

'use strict';

// posts.js文件模块
// 职责：封装针对db.json文件中的数据操作，提供业务级API操作
// 目的：让代码具有组织维护性、可读性，其次才是复用
// 
var fs=require('fs')

var dbPath='./db.json'

// 获取数据库中所有数据
function getDb(callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			return callback(err)
		}

		data=data.toString()

		try{
			data=JSON.parse(data)
			callback(null,data)
		}catch(err){
			return callback(err)
		}
	})
}

exports.getPosts=function(callback){
	getDb(function(err,db){
		if(err){
			return callback(err)
		}
		callback(null,db.posts)
	})
}

exports.addPost=function(data,callback){
	getDb(function(err,db){
		if(err){
			return callback(err)
		}

		var last=db.posts[db.posts.length-1]
		data.id=last?last.id+1:1

		db.posts=JSON.stringify(db)

		fs.writeFile(dbPath,dbData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}