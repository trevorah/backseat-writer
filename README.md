Backseat Writer
===============

How do I run this locally?
--------------------------
You are going to need a static webserver to see anything useful, so try something like [mongoose](https://code.google.com/p/mongoose) or whatever floats your boat.

How does it all work?
---------------------
Have a look at [A Mathematical Theory of Communication By C. E. Shannon](http://cm.bell-labs.com/cm/ms/what/shannonday/shannon1948.pdf) published in 1948. It's a good read and should tell you all you need to know.

Thats a 57 page paper on telegrams... 
-------------------------------------
Ok, so we use a [Markov Chain](http://en.wikipedia.org/wiki/Markov_chain) to guess the next letter based on the previous `n` letters. Our guesses are based on what we've seen before in some text that we've previously analysed. How big `n` is determines the accuracy. From the paper:

>1. Zero-order approximation (symbols independent and equiprobable).
>	XFOML RXKHRJFFJUJ ZLPWCFWKCYJ FFJEYVKCQSGHYD QPAAMKBZAACIBZLHJQD.
>2. First-order approximation (symbols independent but with frequencies of English text).
>	OCRO HLI RGWR NMIELWIS EU LL NBNESEBYA TH EEI ALHENHTTPA OOBTTVA NAH BRL.
>3. Second-order approximation (digram structure as in English).
>	ON IE ANTSOUTINYS ARE T INCTORE ST BE S DEAMY ACHIN D ILONASIVE TUCOOWE AT TEASONARE FUSO TIZIN ANDY TOBE SEACE CTISBE.
>4. Third-order approximation (trigram structure as in English).
>	IN NO IST LAT WHEY CRATICT FROURE BIRS GROCID PONDENOME OF DEMONSTURES OF THE REPTAGIN IS REGOACTIONA OF CRE.

Cool! Make "n" massive and we will get proper English!
-------------------------------
Not as easy as that, sadly. Recording all the probabilities given the previous `n` letters doesn't scale well. Say we have `26` letters, and we need to record every possible path for a `10` letter string of characters. That would be `26^10 = 141167095653376` steps in the paths, and a byte for each letter would total up to just over `1 petabyte`.

Wow. So how big is "n" for Backseat Writer?
-------------------------------------------
`5`, but we only record the top 10 most probable letters for each path. This halves the number of steps and takes the craziness out of the writer (no more weird words ending in 'q'), but does lead to a bit more repetition. This gives us files of json data each with a size of around `2 megabytes`.

Seems fair. Can I poke around?
------------------------------

Of course! And if you find something cool or make the app a little nicer, send a pull request. I'll probably accept it right away. :)