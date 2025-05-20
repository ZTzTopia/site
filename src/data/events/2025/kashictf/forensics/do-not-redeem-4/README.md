---
title: "Do Not Redeem #4"
category: Forensics
tags: 
draft: true
completedDuringEvent: false
submitted: false
flag: KashiCTF{KedA5hKr0f7}
---
> The scammer wrote a poem in a game they played with Kitler. They also shared a redeem voucher with Kitler. Can you find out what the voucher code was? Wrap your answer within `KashiCTF{` and `}`
>
> Flag Format: `KashiCTF{VoucherCode}`
>
> Note: solving the previous part will be of great help in solving this one.
>
> Download `kitler's-phone.tar.gz` : Use the same file as in the challenge description of [forensics/Do Not Redeem #1](https://kashictf.iitbhucybersec.in/challenges#Do%20Not%20Redeem%20#1-28)

by savsch

---

```sh
$ ls -la ./data/data/                                                                                
total 0
drwxrwxrwx 1 ztz ztz 4096 Feb 23 09:00 .
drwxrwxrwx 1 ztz ztz 4096 Feb 23 08:41 ..
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 android
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 android.auto_generated_characteristics_rro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 android.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 android.auto_generated_rro_vendor__
drwxrwxrwx 1 ztz ztz 4096 Feb 23 03:20 com.amazon.mShop.android.shopping
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.backupconfirm
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.bips
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.bips.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.bluetooth
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.bluetoothmidiservice
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.bookmarkprovider
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.calllogbackup
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.android.camera2
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.cameraextensions
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.carrierconfig
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.carrierconfig.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.carrierconfig.auto_generated_rro_vendor__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.carrierdefaultapp
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.cellbroadcastreceiver
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.certinstaller
drwxrwxrwx 1 ztz ztz 4096 Feb 23 02:13 com.android.chrome
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.companiondevicemanager
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.companiondevicemanager.auto_generated_characteristics_rro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.compos.payload
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.credentialmanager
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.cts.ctsshim
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.cts.priv.ctsshim
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.DeviceAsWebcam
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.devicediagnostics
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.devicediagnostics.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.dreams.basic
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.dynsystem
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.egg
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.emulator.multidisplay
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.emulator.radio.config
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.externalstorage
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.htmlviewer
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.imsserviceentitlement
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.inputdevices
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.intentresolver
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.display.cutout.emulation.corner
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.display.cutout.emulation.double
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.display.cutout.emulation.emu01
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.display.cutout.emulation.hole
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.display.cutout.emulation.tall
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.display.cutout.emulation.waterfall
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_2_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_3
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_3a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_3a_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_3_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_4
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_4a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_4_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_5
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_6
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_6a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_6_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_7
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_7a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_7_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_8
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_8a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_8_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_9
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_9_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_9_pro_fold
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_9_pro_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.emulation.pixel_fold
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.ranchu.commonoverlay
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.systemui.navbar.gestural
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.systemui.navbar.threebutton
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.systemui.navbar.transparent
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.internal.systemui.navbar.twobutton
drwxrwxrwx 1 ztz ztz 4096 Feb 22 18:16 com.android.keychain
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.localtransport
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.location.fused
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.managedprovisioning
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.managedprovisioning.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.microdroid.empty_payload
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.mms.service
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.mtp
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.musicfx
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.nfc
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.ons
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.pacprocessor
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.phone
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.phone.auto_generated_characteristics_rro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.phone.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.phone.auto_generated_rro_vendor__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.printspooler
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.blockednumber
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.android.providers.calendar
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.contactkeys
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.contacts
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.contacts.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.android.providers.downloads
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.downloads.ui
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.media
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.partnerbookmarks
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.settings
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.settings.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.android.providers.telephony
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.telephony.auto_generated_characteristics_rro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.telephony.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.providers.userdictionary
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.proxyhandler
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.role.notes.enabled
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.se
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.server.telecom
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.server.telecom.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.settings
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.settings.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.sharedstoragebackup
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.android.shell
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.simappdialog
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.simappdialog.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.soundpicker
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.stk
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.storagemanager
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.storagemanager.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.accessibility.accessibilitymenu
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.accessibility.accessibilitymenu.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.auto_generated_rro_vendor__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_3
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_3a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_3a_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_3_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_4
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_4a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_4_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_5
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_6
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_6a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_6_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_7
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_7a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_7_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_8
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_8a
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_8_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_9
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_9_pro
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_9_pro_fold
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_9_pro_xl
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.emulation.pixel_fold
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.systemui.plugin.globalactions.wallet
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.theme.font.notoserifsource
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.android.traceur
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.traceur.auto_generated_rro_product__
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.vending
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.virtualmachine.res
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.vpndialogs
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.wallpaper
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.wallpaperbackup
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.wallpapercropper
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.android.wallpaper.livepicker
drwxrwxrwx 1 ztz ztz 4096 Feb 23 02:48 com.discord
drwxrwxrwx 1 ztz ztz 4096 Feb 23 03:59 com.facebook.lite
drwxrwxrwx 1 ztz ztz 4096 Feb 23 02:15 com.google.android.adservices.api
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.customization.pixel
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.docs
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.appsearch.apk
drwxrwxrwx 1 ztz ztz 4096 Feb 23 03:43 com.google.android.apps.maps
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.apps.messaging
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.nexuslauncher
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.photos
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.restore
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.apps.safetyhub
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.wallpaper
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.wallpaper.nexus
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.wellbeing
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.apps.youtube.music
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.as
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.as.oss
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.avatarpicker
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.bluetooth
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.calendar
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.captiveportallogin
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.cellbroadcastreceiver
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.cellbroadcastservice
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.configupdater
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.connectivity.resources
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.connectivity.resources.goldfish.overlay
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.contacts
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.deskclock
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.devicelockcontroller
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.dialer
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.documentsui
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.ext.services
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.ext.shared
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.federatedcompute
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.feedback
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.gm
drwxrwxrwx 1 ztz ztz 4096 Feb 23 02:27 com.google.android.gms
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.gms.supervision
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:51 com.google.android.googlequicksearchbox
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.googlesdksetup
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.gsf
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.health.connect.backuprestore
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.healthconnect.controller
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.hotspot2.osulogin
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.markup
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.marvin.talkback
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.marvin.talkbackoverlay
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.modulemetadata
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.networkstack
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.networkstack.tethering
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.networkstack.tethering.emulator
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.odad
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.ondevicepersonalization.services
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.onetimeinitializer
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.overlay.googleconfig
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.overlay.googlewebview
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.overlay.largescreenconfig
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.overlay.largescreensettingsprovider
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.overlay.permissioncontroller
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.overlay.pixelconfigcommon
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.packageinstaller
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.partnersetup
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.permissioncontroller
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.printservice.recommendation
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.projection.gearhead
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.providers.media.module
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.rkpdapp
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.safetycenter.resources
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.server.deviceconfig.resources
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.settings.intelligence
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.soundpicker
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.tag
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.telephony.satellite
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.trichromelibrary_636771938
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:38 com.google.android.tts
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.uwb.resources
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:51 com.google.android.webview
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.wifi.dialog
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.wifi.resources
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.android.youtube
drwxrwxrwx 1 ztz ztz 4096 Feb 23 03:13 com.google.calendar.android
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.mainline.adservices
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:37 com.google.mainline.telemetry
drwxrwxrwx 1 ztz ztz 4096 Feb 23 03:21 com.instagram.lite
drwxrwxrwx 1 ztz ztz 4096 Feb 22 16:53 com.mojang.minecraftpe
```

```sh
$ ls -la ./data/data/com.mojang.minecraftpe/games/com.mojang/minecraftWorlds 
total 0
drwxrwxrwx 1 ztz ztz 4096 Feb 22 16:52  .
drwxrwxrwx 1 ztz ztz 4096 Feb 22 16:53  ..
drwxrwxrwx 1 ztz ztz 4096 Feb 22 17:13 '0RjavQ=='
```

![alt text](image.png)
