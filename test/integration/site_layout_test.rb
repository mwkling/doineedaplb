require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest

  test "layout links" do
    get root_path
    assert_template 'static_pages/home'
    assert_select "a[href=?]", root_path, count: 2
    assert_select "a[href=?]", satnetworks_path
    assert_select "a[href=?]", comptable_path
    assert_select "a[href=?]", rescues_path
    assert_select "a[href=?]", whowhy_path
  end
end
