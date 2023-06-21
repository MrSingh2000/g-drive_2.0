const { artifacts, assert } = require("hardhat");

const Upload = artifacts.require("Upload");
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("Upload", (accounts) => {
    let upload;
    before(async () => {
        upload = await Upload.new();
    });

    const [admin, user1, user2] = [accounts[0], accounts[1], accounts[2]];
    const demoUrl = "https://demo.org/demo_url";

    it("should add the url to the urls list", async () => {
        await upload.add(demoUrl);
        const urls = await upload.display(admin);

        assert(urls.length == 1);
        assert(urls[0] == demoUrl);
    });

    it("should allow the specified user", async () => {
        await upload.allow(user1);
        const shareList = await upload.shareAccess();

        assert(shareList.length == 1);
        assert(shareList[0].user == user1);
    });

    it("should disallow the specified user", async () => {
        await upload.disAllow(user1);
        const shareList = await upload.shareAccess();

        assert(shareList.length == 1);
        assert(shareList[0].access == false);
    });

    it("should not return the access list for incorrect user", async () => {
        await expectRevert(
            upload.display(admin, { from: user1 }),
            "You don't have access"
        );
    })
})