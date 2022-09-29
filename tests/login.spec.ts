
import { Page , expect,test,Locator} from "@playwright/test";
const dataset = JSON.parse(JSON.stringify(require('../utils/TestData.json')))
 
test.describe.only("Test Case of Login ",()=>{

    let page:Page
    test.beforeAll(async({browser})=>{
        const context = await browser.newContext();
        page=await context.newPage()
    })
    
test('Browse The url', async () => {
  await page.goto(dataset.url);
  await page.waitForTimeout(9000);
  console.log(await page.title());
  await expect(page).toHaveTitle("Sign in to Asians - User System")
});

test('Verify the blank field Validation',async()=>{
    await page.locator('#kc-login').click();
    await expect(page.locator('#input-error')).toContainText("Invalid username or password.")
})

test('Verify the wrong email format',async()=>{
    await page.locator('#username').type("test")
    await page.locator('#password').type("345")
    await page.locator('#kc-login').click();
    await expect(page.locator('#input-error')).toContainText("Invalid username or password.")
  
})

test('Verify the Blank email Validation',async()=>{
    await page.locator('#username').fill(" ")
    await page.locator('#password').type("345")
    await page.locator('#kc-login').click();
    await expect(page.locator('#input-error')).toContainText("Invalid username or password.")
  
})

test('VErify the Invalid Credentials',async()=>{
    await page.locator('#username').fill("test@yahoo.in")
    await page.locator('#password').type("987")
    await page.locator('#kc-login').click();
    await expect(page.locator('#input-error')).toContainText("Invalid username or password.")
})

test('Verify the Valid Credentials',async()=>{
    await page.locator('#username').fill(dataset.username)
    await page.locator('#password').type(dataset.password)
    await page.locator('#kc-login').click();
    await page.locator('.vue-avatar--wrapper').click();
    await page.waitForTimeout(3000)
    const emailget = await page.locator("[role='menuitem']").nth(1).textContent();
    console.log(emailget)
    expect(emailget).toContain(dataset.username)

})

});