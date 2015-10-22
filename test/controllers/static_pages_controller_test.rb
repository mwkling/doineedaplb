require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
    assert_select "title", "Quiz | Do I Need a PLB?"
  end

  test "should get whowhy" do
    get :whowhy
    assert_response :success
    assert_select "title", "Who Made This | Do I Need a PLB?"
  end

  test "should get satnetworks" do
    get :satnetworks
    assert_response :success
    assert_select "title", "Satellite Networks | Do I Need a PLB?"
  end

  test "should get rescues" do
    get :rescues
    assert_response :success
    assert_select "title", "Rescues | Do I Need a PLB?"
  end

  test "should get comptable" do
    get :comptable
    assert_response :success
    assert_select "title", "Comparison Table | Do I Need a PLB?"
  end

end
