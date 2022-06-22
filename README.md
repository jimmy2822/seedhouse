# README

## Environment
* Ruby Version: 3.0.2
* Rails Version: 7.0.3
* React Version: 18.1.0
* Database: PostgreSQL

## Setup Project
1. Use `rbenv` or `rvm` to install Ruby 3.0.1
2. Install bundler: `gem install bundler`
3. Install Ruby dependencies: `bundle install`
4. Install Node Package dependencies: `yarn`
5. Create database: `bundle exec rails db:create`
6. Run migrations: `bundle exec rails db:migrate`
7. Generate mock data for database: `bundle exec rake db:seed`. It takes few seconds to crawl data from target website and generate admin account
7. Launch servers: `./bin/dev`
8. Visit Rails app: `http://localhost:3000`

## Admin User
1. After `db:seed` is successful, sign in with below admin account and password
  * account: `test@gmail.com`
  * password: `123456`
2. visit `http://localhost:3000/admin` to access administration page to manage data of the app
