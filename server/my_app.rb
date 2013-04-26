# You'll need to require these if you
# want to develop while running with ruby.
# The config/rackup.ru requires these as well
# for it's own reasons.
#
# $ ruby heroku-sinatra-app.rb
#
require 'rubygems'
# require 'sinatra'
require 'sinatra/base'
# require 'json'
require 'pry'

require_relative 'config/init.rb'

# Quick test

class NotesApp < Sinatra::Base
	set :root, File.dirname(__FILE__)

	get '/' do
	  erb :desktop_index
	end

	get '/mobi' do
		erb :mobi_index
	end


	#  The following code is derived from 
	#  http://addyosmani.com/blog/building-backbone-js-apps-with-ruby-sinatra-mongodb-and-haml/

	get '/api/:thing' do
	  # query a collection :thing, convert the output to an array, map the id
	  # to a string representation of the object's _id and finally output to JSON
	  # DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
		content_type 'application/json', :charset => 'utf-8'
		DB[params[:thing]].find.to_a.map{ |t| 
			from_bson_id(t)
		}.to_json	  
	end

	get '/api/:thing/:id' do
		content_type 'application/json', :charset => 'utf-8'
		# get the first document with the id :id in the collection :thing as a single document (rather
		# than a Cursor, the standard output) using findone(). Our bson utilities assist with
		# ID conversion and the final output returned is also JSON
		from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
	end


	post '/api/:thing' do
		content_type 'application/json', :charset => 'utf-8'
		# parse the post body of the content being posted, convert to a string, insert into
		# the collection #thing and return the ObjectId as a string for reference
		oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.to_s))
		# { "id" => oid.to_s }.to_json
		"{\"id\": \"#{oid.to_s}\"}"
	end

	delete '/api/:thing/:id' do
		# remove the item with id :id from the collection :thing, based on the bson
		# representation of the object id
		DB.collection(params[:thing]).remove('_id' => to_bson_id(params[:id]))
		""
	end

	put '/api/:thing/:id' do
		# binding.pry
		# collection.update() when used with $set (as covered earlier) allows us to set single values
		# in this case, the put request body is converted to a string, rejecting keys with the name 'id' for security purposes
		DB.collection(params[:thing]).update({'_id' => to_bson_id(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == 'id'}})
		from_bson_id(DB.collection(params[:thing]).find_one(to_bson_id(params[:id]))).to_json
	end

	# utilities for generating/converting MongoDB ObjectIds
	def to_bson_id(id) 
		BSON::ObjectId.from_string(id) 
	end

	def from_bson_id(obj) 
		obj = obj.merge({'id' => obj['_id'].to_s})
		obj.delete('_id')
		return obj
	end

	# Test at <appname>.heroku.com

	# You can see all your app specific information this way.
	# IMPORTANT! This is a very bad thing to do for a production
	# application with sensitive information

	# get '/env' do
	#   ENV.inspect
	# end
	# 
	# run! if app_file == $0
end

# require_relative 'config/init.rb'

