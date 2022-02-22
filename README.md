# usb-automaton
A very simple JS script built with Node.js made for a friend to launch specific programs onto his Windows 11 distribution whenever specific USB devices are plugged onto his personal computer. This might evolve into a fully-scalable application that could extend this basic functionality, as it turns out there aren't any softwares, within the Windows ecosystem, that perform such tasks.

Most of the inputs are hard-coded, which doesn't make for a potent scalable application per se, right now. However, it fully covers the needs of the person who asked me to write such a script.

I used the usb-detection and child-process npm packages to perform such a thing.

Here's a quick summary of the magic lying beneath this simple code: each device you plug onto your computer gets assigned several properties, amongst which is a unique number called vendorId. The first part of the task was to retrieve the vendorID of the devices my friend wanted the script to work with/on. From that point on, the rest was fairly easy to come up with, aside from the fact I was not extremely familiar with Windows OS, until I got to work on this little project.

I'm currently learning JavaScript and its quirks, as of right now, but plan to build a state-of-the-art desktop application to automate processes whenever specific devices are plugged (or unplugged).

(README under construction)
