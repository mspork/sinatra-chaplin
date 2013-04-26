require 'mongo'
require 'uri'



class NotesApp < Sinatra::Base

	configure :development do
		DB = Mongo::MongoClient.new("localhost", 27017).db('learning-mongo')
	  # set :database, 'sqlite://development/my_app.db'
	  # require 'sqlite3'
	  set :views, File.dirname(__FILE__) + '/../views'	  
	end
	
	configure :test do
		DB = Mongo::MongoClient.new("localhost", 27017).db('learning-mongo')	
	  # set :database, 'sqlite::memory:'
	  # rspec context looks for views relative to /spec dir unless specified
	  set :views, File.dirname(__FILE__) + '/../views'
	end

	configure :production do
	  # Sequel.connect(ENV['DATABASE_URL'])
	  set :views, File.dirname(__FILE__) + '/../views'
	  db = URI.parse(ENV['MONGOHQ_URL'])
	  db_name = db.path.gsub(/^\//, '')
	  DB = Mongo::Connection.new(db.host, db.port).db(db_name)
	  DB.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)	
	end

end
 
require_relative 'migrations'

#Add our data (tours & dates) from the file config/data.rb
require_relative 'data'

