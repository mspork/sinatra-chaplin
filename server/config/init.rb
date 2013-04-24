require 'mongo'
 

class NotesApp < Sinatra::Base
	DB = Mongo::MongoClient.new("localhost", 27017).db('learning-mongo')
	# DB = Mongo::Connection.new.db("learning-mongo")

	configure :development do
	  # set :database, 'sqlite://development/my_app.db'
	  # require 'sqlite3'
	  set :views, File.dirname(__FILE__) + '/../views'	  
	end
	configure :test do
	  # set :database, 'sqlite::memory:'
	  # rspec context looks for views relative to /spec dir unless specified
	  set :views, File.dirname(__FILE__) + '/../views'
	end
	configure :production do
	  # Sequel.connect(ENV['DATABASE_URL'])
	  set :views, File.dirname(__FILE__) + '/../views'
	end
end
 
require_relative 'migrations'

#Add our data (tours & dates) from the file config/data.rb
require_relative 'data'

