from selenium import webdriver
from selenium.webdriver.common.keys import Keys

options = webdriver.ChromeOptions()
options.add_argument("headless") #headless option indicates that no UI shell is needed
driver = webdriver.Chrome(executable_path=r'chromedriver', chrome_options=options)

username = ""
password = ""

def scrape_data():
    #Get login page
    driver.get("http://146.151.123.136/dlx/session/login")

    #Enter login details and submit
    username_field = driver.find_element_by_id("resol-loginUsername")
    username_field.send_keys("admin")
    password_field = driver.find_element_by_id("resol-loginPassword")
    password_field.send_keys("admin")
    password_field.send_keys(Keys.RETURN)

    #Click live tab
    live_link = driver.find_element_by_link_text('Live')
    live_link.click()

    #Get energy data
    driver.implicitly_wait(5)
    energy_data = driver.find_elements_by_tag_name("td")[59].text
    
    print(energy_data) #Remove 

    driver.close()