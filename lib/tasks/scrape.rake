# frozen_string_literal: true

namespace :crawl do
  task house: :environment do
    HouseScraper.new.crawl!
  end
end
