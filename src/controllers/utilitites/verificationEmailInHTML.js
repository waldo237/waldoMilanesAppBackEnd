/* eslint-disable no-underscore-dangle */
exports.verificationEmailInHTML = (host, user, token) => `<body>
                            <center class="wrapper" data-link-color="rgb(35, 35, 61)" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
                              <div class="webkit">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                                  <tbody><tr>
                                    <td valign="top" bgcolor="#FFFFFF" width="100%">
                                      <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                        <tbody><tr>
                                          <td width="100%">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                              <tbody><tr>
                                                <td>
                                                  <!--[if mso]>
                          <center>
                          <table><tr><td width="600">
                        <![endif]-->
                                                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                            <tbody><tr>
                                                              <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                          <tbody><tr>
                            <td role="module-content">
                              <p></p>
                            </td>
                          </tr>
                        </tbody></table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 20px 30px 20px;" bgcolor="#f6f6f6">
                          <tbody>
                            <tr role="module-content">
                              <td height="100%" valign="top">
                                <table class="column" width="540" style="width:540px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="">
                                  <tbody>
                                    <tr>
                                      <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="72aac1ba-9036-4a77-b9d5-9a60d9b05cba">
                          <tbody>
                            <tr>
                              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="59" alt="" data-proportionally-constrained="true" data-responsive="false" src="https://waldomilanes.com/static/media/banner.4d5315b8.png" height="57">
                            
                                </td>
                            </tr>
                            <tr>
                            <td style="padding:0px 0px 10px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>

                            <tr>
                              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                              <span style="font-size: 43px">w-programming&nbsp;</span>
                              </td>
                              </tr>
                              <tr>
                              <td style="padding:10px 0px 10px 0px;" role="module-content" bgcolor="">
                              </td>
                            </tr>
                              <tr>
                              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                              <span style="font-size: 23px">Waldo Milanes</span>
                              </td>
                              </tr>


                          </tbody>
                        </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="331cde94-eb45-45dc-8852-b7dbeb9101d7">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
                              </td>
                            </tr>
                          </tbody>
                        </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8508015-a2cb-488c-9877-d46adf313282">
                          <tbody>
                      
                          </tbody>
                        </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="27716fe9-ee64-4a64-94f9-a4f28bc172a0">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                              </td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="948e3f3f-5214-4721-a90e-625a47b1c957" data-mc-module-version="2019-10-22">
                          <tbody>
                            <tr>
                              <td style="padding:20px 30px 18px 30px; line-height:20px; text-align:inherit; " height="100%" valign="top" " role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 20px">Thanks for signing up to my blog, ${user.firstName}!&nbsp;</span></div><div></div></div></td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a10dcb57-ad22-4f4d-b765-1d427dfddb4e" data-mc-module-version="2019-10-22">
                          <tbody>
                            <tr>
                              <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Please verify your email address to</span><span style="color: #000000; font-size: 18px; font-family: arial,helvetica,sans-serif"> get access to all my work.</span><span style="font-size: 18px">.</span></div>
                      <div></div></div></td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="#ffffff">
                              </td>
                            </tr>
                          </tbody>
                        </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1">
                            <tbody>
                              <tr>
                                <td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 0px 0px;">
                                  <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                    <tbody>
                                      <tr>
                                      <td align="center" bgcolor="#ffbe00" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                        <a href="https://${host}/auth/confirmation/${user.email}/${user._id}/${token}" style="background-color:#ffbe00; border:1px solid #ffbe00; border-color:#ffbe00; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Verify Email Now</a>
                                      </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d.1">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 50px 0px;" role="module-content" bgcolor="#ffffff">
                              </td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a265ebb9-ab9c-43e8-9009-54d6151b1600" data-mc-module-version="2019-10-22">
                      
                        </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1.1">
                            <tbody>
                      
                            </tbody>
                          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c37cc5b7-79f4-4ac8-b825-9645974c984e">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 30px 0px;" role="module-content" background-color="rgb(35, 35, 61)">
                              </td>
                            </tr>
                          </tbody>
                        </table></td>
                                    </tr>
                                  </tbody>
                                </table>
                                
                              </td>
                            </tr>
                          </tbody>
                        </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="550f60a9-c478-496c-b705-077cf7b1ba9a">
                                <tbody>
                                <tr>
                                    <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
                                    <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                        <tbody>
                                        <tr>
                                        <td align="center" bgcolor="rgb(35, 35, 61)" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="https://waldomilanes.com/" style="background-color:rgb(35, 35, 61); border:1px solid rgb(35, 35, 61); border-color:rgb(35, 35, 61); border-radius:25px; border-width:1px; color:rgb(251, 211, 3); display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">
                                        <div className="footer-credits">
                                        
                                        <span>
                                            &#9400; 2019-
                                            ${new Date().getFullYear()} &nbsp;
                                        </span>
                                        <span> | W PROGRAMMING | </span> <span>&nbsp;waldomilanes.com </span>
                                        </div>
                                        <div>
                                        developed by Waldo Milanes
                                        <span>&reg;</span>
                                        </div>
                                        </a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table></td>
                                        </tr>
                                        </tbody></table>
                                        <!--[if mso]>
                                    </td>
                                    </tr>
                                </table>
                                </center>
                                <![endif]-->
                            </td>
                            </tr>
                        </tbody></table>
                        </td>
                    </tr>
                    </tbody></table>
                </td>
                </tr>
            </tbody></table>
            </div>
        </center>
    </body>`;
