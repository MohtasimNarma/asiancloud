
import { Page , expect,test,Locator} from "@playwright/test";

 
test.describe("Test Case of Register",()=>{

    let page:Page
    test.beforeAll(async({browser})=>{
        const context = await browser.newContext();
        page=await context.newPage()
    })
    
test('Browse The url', async () => {
  await page.goto('https://console.uat.asians.group/#/domain/list');
  await page.waitForTimeout(9000);
  console.log(await page.title());
  await expect(page).toHaveTitle("Sign in to Asians - User System")
});

test('Verify the validation of Register with Blank Fields',async()=>{
    await page.click('text=Register');
    await page.waitForTimeout(4000);
    await page.click("[value='Register']");
    const allvald = await page.locator('.pf-c-alert__title').allTextContents();
    console.log(allvald);
    expect(allvald.toString()).toBe("Please specify username.Please specify email.Please specify password.")
});

test('Verify the Invalid email Validation',async()=>{
    await page.locator("#email").type("ttt")
    await page.click("[value='Register']");
    const Invalidemail = await page.locator('.pf-c-alert__title').allTextContents();
    console.log(Invalidemail);
    expect(Invalidemail.toString()).toBe("Invalid email address.Please specify password.")
});

test('Verify the Blank Password Validation',async()=>{
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    var emrdm =  chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@yahoo.com';
    console.log(emrdm)
    await page.locator("#email").fill(emrdm)
    await page.click("[value='Register']");
    const pwdvld = await page.locator('.pf-c-alert__title').allTextContents();
    console.log(pwdvld);
    expect(pwdvld.toString()).toBe("Please specify password.")
})
test('Verify the Validation with confirm password blank',async()=>{
    await page.locator('#password').type("123")
    await page.click("[value='Register']");
    const convld = await page.locator('.pf-c-alert__title').allTextContents();
    console.log(convld);
    expect(convld.toString()).toBe("Password confirmation doesn't match.")
})

test('Verify the Validation with password blank',async()=>{
    await page.locator('#password').fill(" ")
    await page.locator('#password-confirm').type("123")
    await page.click("[value='Register']");
    const convld = await page.locator('.pf-c-alert__title').allTextContents();
    console.log(convld);
    expect(convld.toString()).toBe("Please specify password.")
})

test('Verify Mismatch Password Validation',async()=>{
    await page.locator('#password').type("456")
    await page.locator('#password-confirm').type("123")
    await page.click("[value='Register']");
    const convld = await page.locator('.pf-c-alert__title').allTextContents();
    console.log(convld);
    expect(convld.toString()).toBe("Password confirmation doesn't match.")
})

test('Enter details correctly and login',async()=>{
    await page.locator('#password').type("456")
    await page.locator('#password-confirm').type("456")
    
})

test('Verify the login done successfuly',async()=>{
    const emailtxt = await page.locator("#email").inputValue();
    console.log(emailtxt);
    await page.click("[value='Register']");
    await page.locator('.vue-avatar--wrapper').click();
    await page.waitForTimeout(3000)
    const emailget = await page.locator("[role='menuitem']").nth(1).textContent();
    console.log(emailget)
    expect(emailtxt).toBe(emailget)


})


});
