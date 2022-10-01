# twareLAB home

## local run

1. make `Gemfile`

```txt
# frozen_string_literal: true
source "https://rubygems.org"
group :jekyll_optional_dependencies do
  gem "jekyll-coffeescript"
  gem "jekyll-docs", :path => "../docs" if Dir.exist?("../docs") && ENV["JEKYLL_VERSION"]
  gem "jekyll-feed", "~> 0.9"
  gem "jekyll-gist"
  gem "jekyll-paginate"
  gem "jekyll-redirect-from"
  gem "kramdown-syntax-coderay"
  gem "matrix"
  gem "mime-types", "~> 3.0"
  gem "rdoc", "~> 6.3.0"
  gem "tomlrb"

  platforms :ruby, :mswin, :mingw, :x64_mingw do
    gem "classifier-reborn", "~> 2.2"
    gem "liquid-c", "~> 4.0"
    gem "yajl-ruby", "~> 1.4"
  end

  # Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
  # and associated library
  platforms :jruby, :mswin, :mingw, :x64_mingw do
    gem "tzinfo", ENV["TZINFO_VERSION"] if ENV["TZINFO_VERSION"]
    gem "tzinfo-data"
  end
end

#

group :site do
  gem "html-proofer", "~> 3.4" if ENV["PROOF"]

  gem "jekyll-avatar"
  gem "jekyll-mentions"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jemoji"
end
```

2. Install & Run

```
bundle install
bundle exec jekyll serve
```
