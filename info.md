Signing the apk:

jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore sagel.keystore /home/azizou/sagel/platforms/android/build/outputs/apk/release/android-release-unsigned.apk sagel
password: rafiou

generate the keystore:
keytool -genkey -v -keystore sagel.keystore -alias sagel -keyalg RSA -keysize 2048 -validity 10000


valid for 10000 days