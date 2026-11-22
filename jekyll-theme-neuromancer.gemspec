# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-neuromancer"
  spec.version       = "0.2.0"
  spec.authors       = ["Spr1ngLif3"]

  spec.summary       = "A minimal dark Jekyll theme inspired by hacker and cyberpunk culture."
  spec.description   = "Neuromancer is a minimal, dark, terminal-flavoured Jekyll theme for " \
                       "personal sites and blogs. Works with GitHub Pages via remote_theme."
  spec.homepage      = "https://github.com/Spr1ngLif3/jekyll-theme-neuromancer"
  spec.license       = "MIT"

  spec.metadata = {
    "source_code_uri"       => spec.homepage,
    "bug_tracker_uri"       => "#{spec.homepage}/issues",
    "changelog_uri"         => "#{spec.homepage}/blob/master/CHANGELOG.md",
    "rubygems_mfa_required" => "true",
    "plugin_type"           => "theme",
  }

  spec.required_ruby_version = ">= 2.7"

  spec.files = Dir.glob("{_layouts,_includes,_sass,assets}/**/*", File::FNM_DOTMATCH)
                  .select { |f| File.file?(f) }
                  .push("LICENSE.txt", "README.md", "CHANGELOG.md")

  spec.add_runtime_dependency "jekyll", ">= 3.9", "< 5.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
end
