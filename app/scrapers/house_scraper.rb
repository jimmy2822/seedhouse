# frozen_string_literal: true

require 'net/http'

class HouseScraper
  attr_reader :response_data, :parsed_properties

  def initialize
    @parsed_properties = []
    @target_cities = {
      taipei: 'https://www.urhouse.com.tw/en/rentals/ajax?page=1&filter=JTdCJTIydHlwZSUyMiUzQSUyMnJlc2lkZW50aWFsJTIyJTJDJTIyY2l0eSUyMiUzQSUyMlRhaXBlaSUyMENpdHklMjIlMkMlMjJkaXN0JTIyJTNBJTVCJTVEJTJDJTIybGF5b3V0JTIyJTNBJTIyJTIyJTJDJTIycmVudCUyMiUzQSU3QiUyMm1pbiUyMiUzQSUyMjMwMDAwJTIyJTJDJTIybWF4JTIyJTNBJTIyMTAwMDAwJTIyJTdEJTJDJTIyZmxvb3Jfc2l6ZSUyMiUzQSU3QiUyMm1pbiUyMiUzQSUyMiUyMiUyQyUyMm1heCUyMiUzQSUyMiUyMiU3RCUyQyUyMnBhcmtpbmclMjIlM0ElN0IlMjJwbGFuZSUyMiUzQSUyMiUyMiUyQyUyMm1lY2hhbmljYWwlMjIlM0ElMjIlMjIlN0QlMkMlMjJoYXNfcGFya2luZyUyMiUzQSUyMiUyMiUyQyUyMm1hcCUyMiUzQSU3QiUyMnNvdXRoJTIyJTNBMCUyQyUyMndlc3QlMjIlM0EwJTJDJTIybm9ydGglMjIlM0EwJTJDJTIyZWFzdCUyMiUzQTAlN0QlMkMlMjJyZXNpZGVudGlhbCUyMiUzQSU3QiUyMnRvdGFsX3Jvb20lMjIlM0ElN0IlMjJtaW4lMjIlM0ElMjIlMjIlMkMlMjJtYXglMjIlM0ElMjIlMjIlN0QlN0QlMkMlMjJvZmZpY2UlMjIlM0ElN0IlN0QlMkMlMjJzdG9yZWZyb250JTIyJTNBJTdCJTdEJTdE&ordering=price&direction=ASC&mode=list',
      new_taipei: 'https://www.urhouse.com.tw/en/rentals/ajax?page=1&filter=JTdCJTIydHlwZSUyMiUzQSUyMnJlc2lkZW50aWFsJTIyJTJDJTIyY2l0eSUyMiUzQSUyMk5ldyUyMFRhaXBlaSUyMENpdHklMjIlMkMlMjJkaXN0JTIyJTNBJTVCJTVEJTJDJTIybGF5b3V0JTIyJTNBJTIyJTIyJTJDJTIycmVudCUyMiUzQSU3QiUyMm1pbiUyMiUzQSUyMjMwMDAwJTIyJTJDJTIybWF4JTIyJTNBJTIyMTAwMDAwJTIyJTdEJTJDJTIyZmxvb3Jfc2l6ZSUyMiUzQSU3QiUyMm1pbiUyMiUzQSUyMiUyMiUyQyUyMm1heCUyMiUzQSUyMiUyMiU3RCUyQyUyMnBhcmtpbmclMjIlM0ElN0IlMjJwbGFuZSUyMiUzQSUyMiUyMiUyQyUyMm1lY2hhbmljYWwlMjIlM0ElMjIlMjIlN0QlMkMlMjJoYXNfcGFya2luZyUyMiUzQSUyMiUyMiUyQyUyMm1hcCUyMiUzQSU3QiUyMnNvdXRoJTIyJTNBMCUyQyUyMndlc3QlMjIlM0EwJTJDJTIybm9ydGglMjIlM0EwJTJDJTIyZWFzdCUyMiUzQTAlN0QlMkMlMjJyZXNpZGVudGlhbCUyMiUzQSU3QiUyMnRvdGFsX3Jvb20lMjIlM0ElN0IlMjJtaW4lMjIlM0ElMjIlMjIlMkMlMjJtYXglMjIlM0ElMjIlMjIlN0QlN0QlMkMlMjJvZmZpY2UlMjIlM0ElN0IlN0QlMkMlMjJzdG9yZWZyb250JTIyJTNBJTdCJTdEJTdE&ordering=price&direction=ASC&mode=list'
    }
  end

  def crawl!
    @target_cities.each do |city, url|
      Rails.logger.info("*** Start scraping #{city} data ***")
      @page = 1
      fetch_data(current_page_url(url))
      parse_data
      save_parsed_properties
      fetch_remaining_pages(current_page_url(url))
    end

    true
  end

  private

  def current_page_url(url)
    url.sub('page=1', "page=#{@page}")
  end

  def fetch_data(target_url)
    Rails.logger.info("*** Start to fetch data from url: #{target_url} ***")
    response = Net::HTTP.get_response(URI(target_url))
    @response_data = JSON.parse(response.body)['data']
    @total_pages = @response_data['pagination'].keys.last.to_i
    Rails.logger.info("*** Fetching data is success total pages: #{@total_pages} ***")
  end

  def parse_data
    sample_properties = @response_data['items'].sample(6)
    @parsed_properties = sample_properties.map do |item|
      parse_property(item)
    end
  end

  def parse_property(item)
    {
      title: item['title'],
      amount_in_cent: item['rent'].to_i / 30 * 100,
      address_district: item['dist'],
      address_city: item['city'],
      address_line: item['road_address'],
      room: item['total_room'],
      mrt_line: item['mrt_line'],
      image: item['image_url']
    }
  end

  def fetch_remaining_pages(url)
    return if @total_pages == 1

    (2..@total_pages).to_a.each do |page|
      @page = page
      fetch_data(current_page_url(url))
      parse_data
      save_parsed_properties
    end
  end

  def save_parsed_properties
    @parsed_properties.each do |property|
      Property.upsert(property, unique_by: [:index_properties_on_title_and_address_line])
    end
    Rails.logger.info("*** save data from page: #{@page} is successful ***")
  end
end
