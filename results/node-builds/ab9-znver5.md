{
  "options": {
    "cpuset": "5",
    "workerCpuset": "4-7",
    "durationMs": 1000,
    "memory": "2g",
    "runs": 4,
    "groups": "",
    "host": ""
  },
  "images": {
    "official": {
      "image": "node:26.10.0-trixie-slim",
      "allocator": "system",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": false,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "off",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "omimalloc": {
      "image": "node:26.10.0-trixie-slim",
      "allocator": "/opt/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": false,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "off",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "c20": {
      "image": "nxtedition/node:ab-26.10.0-c20",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": false,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "lto": {
      "image": "nxtedition/node:ab-26.10.0-c20-lto",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": true,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "znver5": {
      "image": "nxtedition/node:ab-26.10.0-c20-lto-z5",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": true,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "clang23": {
      "image": "nxtedition/node:ab-26.10.0-c23-lto-z5",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": true,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "pgo": {
      "image": "nxtedition/node:ab-26.10.0-c23-lto-z5-pgo",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": true,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": false,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "pc": {
      "image": "nxtedition/node:ab-26.10.0-c23-lto-z5-pgo-pc",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": true,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": true,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    },
    "v8": {
      "image": "nxtedition/node:ab-26.10.0-c23-lto-z5-pgo-pc-v8",
      "allocator": "/usr/local/lib/libmimalloc.so",
      "arch": "x64",
      "compiler": "clang",
      "cpuModel": "AMD EPYC 9355P 32-Core Processor",
      "glibc": "2.41",
      "lto": true,
      "node": "v26.10.0",
      "openssl": "3.5.8",
      "pgo": "clang-ir-weighted-service-corpus-v6",
      "pointerCompression": true,
      "temporal": true,
      "v8": "14.6.202.34-node.34"
    }
  },
  "rows": [
    {
      "name": "Buffer.copy 64 B",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 64.14351385230924,
          "mad": 0.1988058237620507
        },
        "omimalloc": {
          "median": 63.98623275270333,
          "mad": 0.25534829638418444
        },
        "c20": {
          "median": 64.33455506044265,
          "mad": 0.02774247012866482
        },
        "lto": {
          "median": 64.32184299589207,
          "mad": 0.3309170972469033
        },
        "znver5": {
          "median": 65.73356343735972,
          "mad": 0.4212100530664813
        },
        "clang23": {
          "median": 66.38347111259384,
          "mad": 0.10371281220710671
        },
        "pgo": {
          "median": 67.35543161988849,
          "mad": 0.08406821612101112
        },
        "pc": {
          "median": 65.18396072149476,
          "mad": 0.25046333562063694
        },
        "v8": {
          "median": 139.00666327673787,
          "mad": 0.2421714623684892
        }
      }
    },
    {
      "name": "Buffer.copy 4 KiB",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 117.60860521567815,
          "mad": 0.6359395710849114
        },
        "omimalloc": {
          "median": 126.69361672879552,
          "mad": 1.5156268107422335
        },
        "c20": {
          "median": 127.3254599053147,
          "mad": 1.3334826153774202
        },
        "lto": {
          "median": 126.66412075357968,
          "mad": 0.7425173684994419
        },
        "znver5": {
          "median": 126.61335645380633,
          "mad": 0.36528718045799025
        },
        "clang23": {
          "median": 128.08919840528569,
          "mad": 0.508306362177791
        },
        "pgo": {
          "median": 128.7560217797273,
          "mad": 1.7864105556722834
        },
        "pc": {
          "median": 125.63721526344952,
          "mad": 0.8975286731907417
        },
        "v8": {
          "median": 166.6225142231891,
          "mad": 1.8002050597904287
        }
      }
    },
    {
      "name": "Buffer.copy 16 KiB holdout",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 201.13630238890036,
          "mad": 0.5573152366994094
        },
        "omimalloc": {
          "median": 207.26547763327076,
          "mad": 0.8344523327749869
        },
        "c20": {
          "median": 206.6999150225633,
          "mad": 0.7171600225710932
        },
        "lto": {
          "median": 207.21038917930312,
          "mad": 0.6457926272443189
        },
        "znver5": {
          "median": 207.83038850775108,
          "mad": 0.19469506977669937
        },
        "clang23": {
          "median": 207.99725195598867,
          "mad": 0.9102732742630764
        },
        "pgo": {
          "median": 209.8516889906549,
          "mad": 0.353102378785664
        },
        "pc": {
          "median": 206.59428781515612,
          "mad": 0.9056166236761101
        },
        "v8": {
          "median": 229.59878184873432,
          "mad": 1.3218803723282946
        }
      }
    },
    {
      "name": "Buffer.copy 128 KiB, storage chunk",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 83.93991328058485,
          "mad": 0.7148626190433589
        },
        "omimalloc": {
          "median": 81.4856451717572,
          "mad": 0.7299622573701612
        },
        "c20": {
          "median": 79.25990296985717,
          "mad": 2.186183908203887
        },
        "lto": {
          "median": 81.84845051966394,
          "mad": 2.114036739470457
        },
        "znver5": {
          "median": 90.3088999544591,
          "mad": 0.7866273308989875
        },
        "clang23": {
          "median": 85.53719824530963,
          "mad": 0.7526161180569915
        },
        "pgo": {
          "median": 82.42696275715353,
          "mad": 0.3212356533614056
        },
        "pc": {
          "median": 84.34986327655011,
          "mad": 3.14499195908801
        },
        "v8": {
          "median": 80.22173223630551,
          "mad": 0.518937569670527
        }
      }
    },
    {
      "name": "Buffer.copy 1 MiB",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 57.973563000728525,
          "mad": 0.09088396697044487
        },
        "omimalloc": {
          "median": 58.00240852354649,
          "mad": 0.02519752366906758
        },
        "c20": {
          "median": 58.031595671801,
          "mad": 0.29491369187758565
        },
        "lto": {
          "median": 57.964302958492866,
          "mad": 0.1669552817629274
        },
        "znver5": {
          "median": 58.21613667032433,
          "mad": 0.10010769048590262
        },
        "clang23": {
          "median": 58.2694384350996,
          "mad": 0.14363118536675756
        },
        "pgo": {
          "median": 58.34258320896156,
          "mad": 0.14029168097829015
        },
        "pc": {
          "median": 58.207001420892354,
          "mad": 0.07011619161759697
        },
        "v8": {
          "median": 58.16362870122033,
          "mad": 0.14246326496731143
        }
      }
    },
    {
      "name": "Buffer.swap16 8 KiB holdout",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 54.120404914792644,
          "mad": 0.3972959513014551
        },
        "omimalloc": {
          "median": 52.7455670116596,
          "mad": 1.026403997822694
        },
        "c20": {
          "median": 52.451765619645926,
          "mad": 0.7295883355246886
        },
        "lto": {
          "median": 51.927685464997715,
          "mad": 0.41045596551258967
        },
        "znver5": {
          "median": 201.62364906781715,
          "mad": 2.9807105370792755
        },
        "clang23": {
          "median": 203.10386404529032,
          "mad": 2.3511316175309815
        },
        "pgo": {
          "median": 203.17590075418534,
          "mad": 1.0460382231968168
        },
        "pc": {
          "median": 199.81422966041958,
          "mad": 1.8098480168513902
        },
        "v8": {
          "median": 200.7600843468622,
          "mad": 2.7869072518755758
        }
      }
    },
    {
      "name": "Buffer frame encode/decode 256 B",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 32.28582421304489,
          "mad": 0.08025534705225468
        },
        "omimalloc": {
          "median": 31.387196727400827,
          "mad": 0.1633581234370478
        },
        "c20": {
          "median": 31.551367927487497,
          "mad": 0.21117768446343987
        },
        "lto": {
          "median": 31.710819295329905,
          "mad": 0.1332537979600339
        },
        "znver5": {
          "median": 32.039242820933666,
          "mad": 0.1559833107340296
        },
        "clang23": {
          "median": 32.11340142783159,
          "mad": 0.33535644845254
        },
        "pgo": {
          "median": 32.56916836531636,
          "mad": 0.10363680349053794
        },
        "pc": {
          "median": 32.13821594055968,
          "mad": 0.3602639112321313
        },
        "v8": {
          "median": 48.71740107340047,
          "mad": 6.020865691061935
        }
      }
    },
    {
      "name": "Buffer.allocUnsafe 256 KiB chunk churn",
      "unit": "Kops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1469.9252309043886,
          "mad": 18.92829235644058
        },
        "omimalloc": {
          "median": 2120.915965930082,
          "mad": 13.726344187178938
        },
        "c20": {
          "median": 2155.3052115849187,
          "mad": 42.52787080142366
        },
        "lto": {
          "median": 2143.243798540526,
          "mad": 31.26344147843156
        },
        "znver5": {
          "median": 2207.4050487534187,
          "mad": 21.289044233679306
        },
        "clang23": {
          "median": 2260.2831918705197,
          "mad": 41.64488092773263
        },
        "pgo": {
          "median": 2343.51416004796,
          "mad": 35.70763265185724
        },
        "pc": {
          "median": 2251.053519977844,
          "mad": 41.860546916757585
        },
        "v8": {
          "median": 2341.0073283578586,
          "mad": 37.08894767910874
        }
      }
    },
    {
      "name": "Buffer.concat 2 × 256 B",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 10.84949122466607,
          "mad": 0.03057453998145654
        },
        "omimalloc": {
          "median": 10.96997487185287,
          "mad": 0.04029966090646386
        },
        "c20": {
          "median": 11.03065359725235,
          "mad": 0.05289786009235353
        },
        "lto": {
          "median": 11.045077305694896,
          "mad": 0.010365920518114358
        },
        "znver5": {
          "median": 11.113726363545727,
          "mad": 0.06462490189947534
        },
        "clang23": {
          "median": 10.99872669754604,
          "mad": 0.039093481534761665
        },
        "pgo": {
          "median": 11.166042697636243,
          "mad": 0.013037926285483614
        },
        "pc": {
          "median": 10.801933859621544,
          "mad": 0.01708185185191269
        },
        "v8": {
          "median": 10.808854100815628,
          "mad": 0.00991239998197635
        }
      }
    },
    {
      "name": "SHA-256 1 MiB",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2.02878004998389,
          "mad": 0.00014746303444290731
        },
        "omimalloc": {
          "median": 2.029495477420273,
          "mad": 0.0007063108727123346
        },
        "c20": {
          "median": 2.0294904503377835,
          "mad": 0.00037541351444869697
        },
        "lto": {
          "median": 2.0294757476260834,
          "mad": 0.00044640959814690184
        },
        "znver5": {
          "median": 2.0291873250960015,
          "mad": 0.0006326978672437367
        },
        "clang23": {
          "median": 2.0291440322814562,
          "mad": 0.0005196219370888766
        },
        "pgo": {
          "median": 2.0299822977257076,
          "mad": 0.0001781522761825638
        },
        "pc": {
          "median": 2.032001209482483,
          "mad": 0.00003318487405157278
        },
        "v8": {
          "median": 2.0307951964469506,
          "mad": 0.000612484787090084
        }
      }
    },
    {
      "name": "SHA-256 128 KiB, storage chunk",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1.9943267813418708,
          "mad": 0.00008112645684943409
        },
        "omimalloc": {
          "median": 1.9992682069350902,
          "mad": 0.00025281578748737044
        },
        "c20": {
          "median": 1.999439490478435,
          "mad": 0.00007671984275714472
        },
        "lto": {
          "median": 1.998550152936244,
          "mad": 0.0003369574883959059
        },
        "znver5": {
          "median": 2.0013961407935907,
          "mad": 0.000675124822540285
        },
        "clang23": {
          "median": 2.001600054733302,
          "mad": 0.0002459647006112231
        },
        "pgo": {
          "median": 2.0055703108817324,
          "mad": 0.0007119288259660461
        },
        "pc": {
          "median": 2.004520408284995,
          "mad": 0.00034236718789038
        },
        "v8": {
          "median": 2.005340588910661,
          "mad": 0.00024892907573925704
        }
      }
    },
    {
      "name": "gzip level 1, 1 MiB",
      "unit": "MiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2362.8471892824055,
          "mad": 3.6934448598690324
        },
        "omimalloc": {
          "median": 2372.7415553174214,
          "mad": 0.25111065232385954
        },
        "c20": {
          "median": 2328.5428901466444,
          "mad": 1.2480799177146764
        },
        "lto": {
          "median": 2269.954554138376,
          "mad": 1.37300638667557
        },
        "znver5": {
          "median": 2470.3453592272235,
          "mad": 0.5346092755351037
        },
        "clang23": {
          "median": 1635.1877721983083,
          "mad": 0.5288986030080878
        },
        "pgo": {
          "median": 1546.1121619903665,
          "mad": 1.13080934337313
        },
        "pc": {
          "median": 1543.0522544907512,
          "mad": 5.710807411425662
        },
        "v8": {
          "median": 1544.7471293565497,
          "mad": 6.353067607132061
        }
      }
    },
    {
      "name": "gunzip 1 MiB",
      "unit": "MiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2064.4291699724317,
          "mad": 10.727775994867443
        },
        "omimalloc": {
          "median": 2028.5405258589017,
          "mad": 23.34805769760601
        },
        "c20": {
          "median": 2036.4091562332928,
          "mad": 34.27402279701573
        },
        "lto": {
          "median": 1997.0484439689367,
          "mad": 6.879585690030126
        },
        "znver5": {
          "median": 2070.0217048079194,
          "mad": 37.30736159666708
        },
        "clang23": {
          "median": 1417.7807342727706,
          "mad": 4.273165943014533
        },
        "pgo": {
          "median": 1454.9282363332932,
          "mad": 4.530673116895855
        },
        "pc": {
          "median": 1520.7362064536703,
          "mad": 6.94784525164323
        },
        "v8": {
          "median": 1494.2086590391432,
          "mad": 15.202537095480238
        }
      }
    },
    {
      "name": "JSON.parse 0.5 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 927.2735786115356,
          "mad": 6.676168234927161
        },
        "omimalloc": {
          "median": 924.2851076580453,
          "mad": 1.392984755664429
        },
        "c20": {
          "median": 947.6475563670814,
          "mad": 14.315495765984167
        },
        "lto": {
          "median": 911.4344530144303,
          "mad": 11.496799221161268
        },
        "znver5": {
          "median": 908.1022666382585,
          "mad": 5.5392825496657565
        },
        "clang23": {
          "median": 903.878912141117,
          "mad": 4.8784913064415605
        },
        "pgo": {
          "median": 1019.9579033638342,
          "mad": 9.633000864381643
        },
        "pc": {
          "median": 1042.6426405094367,
          "mad": 5.2781880931751175
        },
        "v8": {
          "median": 1015.6838746583638,
          "mad": 4.489641816756659
        }
      }
    },
    {
      "name": "JSON.stringify 0.5 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2011.2674931679326,
          "mad": 6.62490942503814
        },
        "omimalloc": {
          "median": 2017.6110316285135,
          "mad": 2.672707301768469
        },
        "c20": {
          "median": 2011.2268216679086,
          "mad": 0.6904248330142764
        },
        "lto": {
          "median": 1987.838463544889,
          "mad": 3.244644602132553
        },
        "znver5": {
          "median": 1974.8468552102709,
          "mad": 9.372803920949195
        },
        "clang23": {
          "median": 2006.60251461506,
          "mad": 4.015841771059172
        },
        "pgo": {
          "median": 2023.870117931285,
          "mad": 3.1030600525081127
        },
        "pc": {
          "median": 1976.1229908888606,
          "mad": 11.598646336494312
        },
        "v8": {
          "median": 1968.0512055924098,
          "mad": 9.395637928605993
        }
      }
    },
    {
      "name": "JSON.stringify record value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 19.42882376827555,
          "mad": 0.07827730551850642
        },
        "omimalloc": {
          "median": 19.495783629794772,
          "mad": 0.0030433503427076403
        },
        "c20": {
          "median": 19.345348024289777,
          "mad": 0.16825221343774643
        },
        "lto": {
          "median": 19.442890883593222,
          "mad": 0.13359795733386548
        },
        "znver5": {
          "median": 19.750890447851642,
          "mad": 0.12922150853797199
        },
        "clang23": {
          "median": 19.811549481797776,
          "mad": 0.11058997238274415
        },
        "pgo": {
          "median": 20.942999907113226,
          "mad": 0.12265379630713547
        },
        "pc": {
          "median": 19.088356818058493,
          "mad": 0.15528899040944033
        },
        "v8": {
          "median": 17.95502580616744,
          "mad": 0.20833922055156684
        }
      }
    },
    {
      "name": "JSON.stringify general domain",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 5.362826294562547,
          "mad": 0.03761912098828901
        },
        "omimalloc": {
          "median": 5.6371821012585865,
          "mad": 0.04214725593421287
        },
        "c20": {
          "median": 5.656193876092682,
          "mad": 0.023312008485146585
        },
        "lto": {
          "median": 5.696232957524996,
          "mad": 0.010300522885692054
        },
        "znver5": {
          "median": 5.55873158914085,
          "mad": 0.033689450809128996
        },
        "clang23": {
          "median": 5.7022224837606075,
          "mad": 0.01716847603014582
        },
        "pgo": {
          "median": 6.068474995782021,
          "mad": 0.006426591686499616
        },
        "pc": {
          "median": 5.746819094357825,
          "mad": 0.030882623248916108
        },
        "v8": {
          "median": 5.7378984169109115,
          "mad": 0.09073548417157085
        }
      }
    },
    {
      "name": "JSON.stringify RPC message",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 5.581730883528898,
          "mad": 0.13354979971190772
        },
        "omimalloc": {
          "median": 5.942852411665889,
          "mad": 0.16326797721386077
        },
        "c20": {
          "median": 5.971843005453098,
          "mad": 0.04599543366938308
        },
        "lto": {
          "median": 5.990587698572417,
          "mad": 0.02785102154572705
        },
        "znver5": {
          "median": 5.830114661979543,
          "mad": 0.08976106231417136
        },
        "clang23": {
          "median": 5.998788144865847,
          "mad": 0.011778690886750542
        },
        "pgo": {
          "median": 6.449687061647662,
          "mad": 0.009961994619982928
        },
        "pc": {
          "median": 6.227295575922659,
          "mad": 0.02709091830245125
        },
        "v8": {
          "median": 6.284385133879397,
          "mad": 0.024214168337480135
        }
      }
    },
    {
      "name": "JSON.stringify 512-value batch",
      "unit": "Kbatches/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 44.81121896786939,
          "mad": 0.1766992655322106
        },
        "omimalloc": {
          "median": 44.87881001358829,
          "mad": 0.09450140871098611
        },
        "c20": {
          "median": 43.735008831351244,
          "mad": 0.30087146637908546
        },
        "lto": {
          "median": 43.945531091617575,
          "mad": 0.46584217369451153
        },
        "znver5": {
          "median": 43.96981072493871,
          "mad": 0.12983965103969908
        },
        "clang23": {
          "median": 43.68319398208475,
          "mad": 0.1320320096356724
        },
        "pgo": {
          "median": 46.82948006005344,
          "mad": 0.36131208823980643
        },
        "pc": {
          "median": 43.92650988214234,
          "mad": 0.13640204388691046
        },
        "v8": {
          "median": 41.784694554781396,
          "mad": 0.4865269585911456
        }
      }
    },
    {
      "name": "JSON.parse record value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 9.006021981828347,
          "mad": 0.07975530212340232
        },
        "omimalloc": {
          "median": 9.080396352072139,
          "mad": 0.050425110385049265
        },
        "c20": {
          "median": 9.031910534296,
          "mad": 0.04779248812074677
        },
        "lto": {
          "median": 9.04845193250788,
          "mad": 0.028998224118532256
        },
        "znver5": {
          "median": 9.036641100855139,
          "mad": 0.02903467580155983
        },
        "clang23": {
          "median": 8.557293326785977,
          "mad": 0.03970738206229196
        },
        "pgo": {
          "median": 11.08877022171442,
          "mad": 0.2060352676964161
        },
        "pc": {
          "median": 11.043030071020775,
          "mad": 0.02806535855704162
        },
        "v8": {
          "median": 10.980852838012343,
          "mad": 0.04067161974882083
        }
      }
    },
    {
      "name": "JSON.parse general domain",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2.624391856809747,
          "mad": 0.01407108967910764
        },
        "omimalloc": {
          "median": 2.632617340067257,
          "mad": 0.02046582986270118
        },
        "c20": {
          "median": 2.6090528557218584,
          "mad": 0.02140245681344055
        },
        "lto": {
          "median": 2.559427896490308,
          "mad": 0.00313313604326515
        },
        "znver5": {
          "median": 2.5902838488361546,
          "mad": 0.01799207601231223
        },
        "clang23": {
          "median": 2.4352183499290705,
          "mad": 0.03191881837192345
        },
        "pgo": {
          "median": 3.435658450467118,
          "mad": 0.028970508739250445
        },
        "pc": {
          "median": 3.3208582860570184,
          "mad": 0.042556894571792014
        },
        "v8": {
          "median": 3.420451790011125,
          "mad": 0.04285494584497873
        }
      }
    },
    {
      "name": "JSON.parse RPC message",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2.938991962113807,
          "mad": 0.008957483934443733
        },
        "omimalloc": {
          "median": 2.8983472292737966,
          "mad": 0.01269986645006238
        },
        "c20": {
          "median": 2.8144480322981966,
          "mad": 0.030881956291185064
        },
        "lto": {
          "median": 2.8246662446449013,
          "mad": 0.045041893710647596
        },
        "znver5": {
          "median": 2.8972402695459625,
          "mad": 0.004409488827309405
        },
        "clang23": {
          "median": 2.7649514556381205,
          "mad": 0.009176794937747035
        },
        "pgo": {
          "median": 4.0487417699421435,
          "mad": 0.008193181513143966
        },
        "pc": {
          "median": 4.0221418706068865,
          "mad": 0.036139670765358956
        },
        "v8": {
          "median": 4.120358103547111,
          "mad": 0.013434255106871795
        }
      }
    },
    {
      "name": "JSON.parse primitives 1 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 958.109351004739,
          "mad": 1.3232188592468788
        },
        "omimalloc": {
          "median": 958.3871538039148,
          "mad": 0.8092458195395693
        },
        "c20": {
          "median": 947.1028297756906,
          "mad": 3.1408858071555414
        },
        "lto": {
          "median": 941.8902957553543,
          "mad": 1.4842627658193805
        },
        "znver5": {
          "median": 960.7265293159612,
          "mad": 1.3755997777018365
        },
        "clang23": {
          "median": 987.8307739569887,
          "mad": 1.351673383089235
        },
        "pgo": {
          "median": 971.4487489103165,
          "mad": 0.5354335204209519
        },
        "pc": {
          "median": 1000.6120207405522,
          "mad": 5.138712851356786
        },
        "v8": {
          "median": 989.8885466832355,
          "mad": 4.119542519287961
        }
      }
    },
    {
      "name": "JSON.stringify primitives 1 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1266.122250522379,
          "mad": 1.1182797755151341
        },
        "omimalloc": {
          "median": 1269.9962687449176,
          "mad": 2.1530339056105277
        },
        "c20": {
          "median": 1240.1146644561622,
          "mad": 2.910263845227746
        },
        "lto": {
          "median": 1233.6975314662607,
          "mad": 5.84542630897306
        },
        "znver5": {
          "median": 1238.9285851230418,
          "mad": 2.695953481347942
        },
        "clang23": {
          "median": 1254.2032608467512,
          "mad": 1.2404394902957847
        },
        "pgo": {
          "median": 1425.0783310204092,
          "mad": 1.4064292208948928
        },
        "pc": {
          "median": 1411.5607956698814,
          "mad": 2.7728299620100643
        },
        "v8": {
          "median": 1432.8965270000135,
          "mad": 1.209914391399252
        }
      }
    },
    {
      "name": "JSON.parse escaped strings 1.8 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 518.5276314128974,
          "mad": 0.40836283008565033
        },
        "omimalloc": {
          "median": 518.3602163611255,
          "mad": 1.1762504188214962
        },
        "c20": {
          "median": 516.3288949911662,
          "mad": 1.1309437044827746
        },
        "lto": {
          "median": 492.23952826323296,
          "mad": 0.6136051939921003
        },
        "znver5": {
          "median": 501.1721167083698,
          "mad": 1.3331147597653512
        },
        "clang23": {
          "median": 500.85704043422817,
          "mad": 0.9011826955130005
        },
        "pgo": {
          "median": 615.9383397669508,
          "mad": 3.2988793540395136
        },
        "pc": {
          "median": 600.1502859416781,
          "mad": 0.6570448397950486
        },
        "v8": {
          "median": 605.1177772522899,
          "mad": 3.395429847744367
        }
      }
    },
    {
      "name": "JSON.stringify escaped strings 1.8 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 467.59823754907654,
          "mad": 0.36930962821915614
        },
        "omimalloc": {
          "median": 748.9806349235218,
          "mad": 1.698113011418343
        },
        "c20": {
          "median": 743.0363400614112,
          "mad": 1.0137899677775977
        },
        "lto": {
          "median": 735.7711258408186,
          "mad": 3.3953559726585354
        },
        "znver5": {
          "median": 749.2252650360052,
          "mad": 2.2535374100102104
        },
        "clang23": {
          "median": 742.4098869171769,
          "mad": 2.8956820331164863
        },
        "pgo": {
          "median": 816.0632256076561,
          "mad": 0.8546880022334449
        },
        "pc": {
          "median": 520.237406129814,
          "mad": 25.651204092020464
        },
        "v8": {
          "median": 566.3770411132559,
          "mad": 0.5379461988446792
        }
      }
    },
    {
      "name": "JSON.parse GeoJSON holdout",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 228.64718435764462,
          "mad": 1.784689074050732
        },
        "omimalloc": {
          "median": 227.37269186113542,
          "mad": 0.3320360712004202
        },
        "c20": {
          "median": 224.24285680099467,
          "mad": 0.5301379283945806
        },
        "lto": {
          "median": 208.80256976562734,
          "mad": 1.9588266801309402
        },
        "znver5": {
          "median": 241.313925623566,
          "mad": 1.1577529936673017
        },
        "clang23": {
          "median": 244.1333987912587,
          "mad": 2.1200494551459172
        },
        "pgo": {
          "median": 323.0462215912521,
          "mad": 2.442956135513157
        },
        "pc": {
          "median": 310.1782357913055,
          "mad": 1.1963368767491716
        },
        "v8": {
          "median": 326.6898095911687,
          "mad": 0.66159084805102
        }
      }
    },
    {
      "name": "JSON.stringify GeoJSON holdout",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 302.3887550450686,
          "mad": 0.2870114077165624
        },
        "omimalloc": {
          "median": 406.1121718564905,
          "mad": 0.741276862712823
        },
        "c20": {
          "median": 370.92891011480833,
          "mad": 1.4296947667187965
        },
        "lto": {
          "median": 371.43067263562676,
          "mad": 0.4805686573684511
        },
        "znver5": {
          "median": 385.13308659109686,
          "mad": 1.810771544739481
        },
        "clang23": {
          "median": 374.9739765150032,
          "mad": 6.736898527316441
        },
        "pgo": {
          "median": 423.07858462285014,
          "mad": 0.5669374066403634
        },
        "pc": {
          "median": 488.2400741770085,
          "mad": 2.700005541987707
        },
        "v8": {
          "median": 496.04779805464415,
          "mad": 0.252970178204464
        }
      }
    },
    {
      "name": "HTTP/1.1 loopback, 64 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 48944.489805487174,
          "mad": 181.85431826176136
        },
        "omimalloc": {
          "median": 49300.906297040456,
          "mad": 78.95687557432029
        },
        "c20": {
          "median": 49044.20805262163,
          "mad": 203.91369466554534
        },
        "lto": {
          "median": 50978.68862859105,
          "mad": 740.7179721364882
        },
        "znver5": {
          "median": 51430.76760736885,
          "mad": 362.1226040916299
        },
        "clang23": {
          "median": 51432.10470452255,
          "mad": 113.45335008279653
        },
        "pgo": {
          "median": 60763.26139645714,
          "mad": 190.74321903816963
        },
        "pc": {
          "median": 62593.18107928445,
          "mad": 161.37259737021668
        },
        "v8": {
          "median": 62261.947855272025,
          "mad": 537.4206825052825
        }
      }
    },
    {
      "name": "HTTP/1.1 POST 4 KiB loopback, 64 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 43120.57522497623,
          "mad": 1299.4872985547918
        },
        "omimalloc": {
          "median": 42584.793046850165,
          "mad": 747.5193302767839
        },
        "c20": {
          "median": 44132.31746913039,
          "mad": 872.9323449829972
        },
        "lto": {
          "median": 43493.26087860745,
          "mad": 252.46207315335414
        },
        "znver5": {
          "median": 45403.09222655017,
          "mad": 974.3241662038236
        },
        "clang23": {
          "median": 45607.116987435395,
          "mad": 1483.1367016439763
        },
        "pgo": {
          "median": 49561.124287070765,
          "mad": 573.8696305711455
        },
        "pc": {
          "median": 53334.33985888332,
          "mad": 185.77579747208074
        },
        "v8": {
          "median": 53308.79484739416,
          "mad": 51.784932089285576
        }
      }
    },
    {
      "name": "HTTP/1.1 POST 64 KiB holdout, 16 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 15977.111911733986,
          "mad": 147.11781554035588
        },
        "omimalloc": {
          "median": 16922.76235151389,
          "mad": 162.03142819463756
        },
        "c20": {
          "median": 16605.104799289387,
          "mad": 191.83597406015724
        },
        "lto": {
          "median": 16627.683059529794,
          "mad": 61.75422880104088
        },
        "znver5": {
          "median": 16821.441733357024,
          "mad": 57.77619517516723
        },
        "clang23": {
          "median": 17089.9800264152,
          "mad": 106.98439991667328
        },
        "pgo": {
          "median": 18471.97473177644,
          "mad": 325.37474634079445
        },
        "pc": {
          "median": 21081.89897779732,
          "mad": 394.46131091226016
        },
        "v8": {
          "median": 21224.83899223625,
          "mad": 64.79599552340005
        }
      }
    },
    {
      "name": "HTTP/1.1 GET 4 KiB, 4 Workers on one reusePort socket, 64 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 69496.05125081984,
          "mad": 673.488448855991
        },
        "omimalloc": {
          "median": 68989.00410238556,
          "mad": 409.24292648966366
        },
        "c20": {
          "median": 69721.17899095331,
          "mad": 902.3692058554952
        },
        "lto": {
          "median": 70555.18401157478,
          "mad": 181.4738671208397
        },
        "znver5": {
          "median": 72434.12086038128,
          "mad": 128.6861105239077
        },
        "clang23": {
          "median": 69801.79478390497,
          "mad": 398.37739962716296
        },
        "pgo": {
          "median": 80443.32807869825,
          "mad": 851.9796298796355
        },
        "pc": {
          "median": 85448.73799939778,
          "mad": 2443.768640848066
        },
        "v8": {
          "median": 85372.64506223347,
          "mad": 244.52667911388562
        }
      }
    },
    {
      "name": "Process startup",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 11.291260749999992,
          "mad": 0.10762475000000649
        },
        "omimalloc": {
          "median": 11.553392999999986,
          "mad": 0.014468499999992446
        },
        "c20": {
          "median": 12.17151250000002,
          "mad": 0.03567224999999752
        },
        "lto": {
          "median": 12.172150749999986,
          "mad": 0.048684499999993136
        },
        "znver5": {
          "median": 12.266632750000007,
          "mad": 0.11304700000000167
        },
        "clang23": {
          "median": 12.382710000000003,
          "mad": 0.2919932499999902
        },
        "pgo": {
          "median": 11.017899499999984,
          "mad": 0.030396000000010304
        },
        "pc": {
          "median": 10.450284750000009,
          "mad": 0.04536900000000088
        },
        "v8": {
          "median": 10.481690499999985,
          "mad": 0.05453150000001017
        }
      }
    },
    {
      "name": "RSS after 512 MiB Buffer churn",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 62.79296875,
          "mad": 0.197265625
        },
        "omimalloc": {
          "median": 578.822265625,
          "mad": 0.236328125
        },
        "c20": {
          "median": 581.58984375,
          "mad": 0.130859375
        },
        "lto": {
          "median": 580.478515625,
          "mad": 0.068359375
        },
        "znver5": {
          "median": 580.525390625,
          "mad": 0.287109375
        },
        "clang23": {
          "median": 581.58203125,
          "mad": 0.119140625
        },
        "pgo": {
          "median": 572.453125,
          "mad": 0.10546875
        },
        "pc": {
          "median": 569.1640625,
          "mad": 0.1875
        },
        "v8": {
          "median": 569.27734375,
          "mad": 0.013671875
        }
      }
    },
    {
      "name": "RSS retained above baseline",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 0.203125,
          "mad": 0.203125
        },
        "omimalloc": {
          "median": 513,
          "mad": 0
        },
        "c20": {
          "median": 513.26953125,
          "mad": 0.25
        },
        "lto": {
          "median": 513.5,
          "mad": 0
        },
        "znver5": {
          "median": 513.25,
          "mad": 0.25
        },
        "clang23": {
          "median": 513.525390625,
          "mad": 0.029296875
        },
        "pgo": {
          "median": 513.5,
          "mad": 0
        },
        "pc": {
          "median": 514,
          "mad": 0
        },
        "v8": {
          "median": 514,
          "mad": 0
        }
      }
    },
    {
      "name": "Committed RSS at churn peak",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 513.5,
          "mad": 0
        },
        "omimalloc": {
          "median": 513,
          "mad": 0
        },
        "c20": {
          "median": 513,
          "mad": 0
        },
        "lto": {
          "median": 513,
          "mad": 0
        },
        "znver5": {
          "median": 513,
          "mad": 0
        },
        "clang23": {
          "median": 513,
          "mad": 0
        },
        "pgo": {
          "median": 513.5,
          "mad": 0
        },
        "pc": {
          "median": 513.75,
          "mad": 0.25
        },
        "v8": {
          "median": 514,
          "mad": 0
        }
      }
    },
    {
      "name": "Allocate 2M-object graph",
      "unit": "Mobjects/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 13.72108896172427,
          "mad": 0.4729561398748059
        },
        "omimalloc": {
          "median": 13.79383105141827,
          "mad": 0.20526863606773205
        },
        "c20": {
          "median": 14.095502529402676,
          "mad": 0.08055378517492073
        },
        "lto": {
          "median": 14.348800299684498,
          "mad": 0.051205060926379886
        },
        "znver5": {
          "median": 13.992942182012753,
          "mad": 0.019714461470980105
        },
        "clang23": {
          "median": 14.211014263968657,
          "mad": 0.13840441480605925
        },
        "pgo": {
          "median": 16.048862024116914,
          "mad": 0.23557881324773522
        },
        "pc": {
          "median": 36.19041449649647,
          "mad": 0.7485594008969976
        },
        "v8": {
          "median": 38.87971784105163,
          "mad": 0.5613250958904743
        }
      }
    },
    {
      "name": "RSS for 2M-object graph",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 193.873046875,
          "mad": 8.15625
        },
        "omimalloc": {
          "median": 183.5,
          "mad": 2.75
        },
        "c20": {
          "median": 183.5,
          "mad": 0
        },
        "lto": {
          "median": 180,
          "mad": 0.25
        },
        "znver5": {
          "median": 181.75,
          "mad": 1.5
        },
        "clang23": {
          "median": 179,
          "mad": 1
        },
        "pgo": {
          "median": 181,
          "mad": 0.75
        },
        "pc": {
          "median": 71.25,
          "mad": 0.25
        },
        "v8": {
          "median": 72,
          "mad": 0.75
        }
      }
    },
    {
      "name": "V8 heap for 2M-object graph",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 122.07245635986328,
          "mad": 0
        },
        "omimalloc": {
          "median": 122.07245635986328,
          "mad": 0
        },
        "c20": {
          "median": 122.06965637207031,
          "mad": 0.00279998779296875
        },
        "lto": {
          "median": 122.07245635986328,
          "mad": 0
        },
        "znver5": {
          "median": 122.06965637207031,
          "mad": 0.00279998779296875
        },
        "clang23": {
          "median": 122.06685638427734,
          "mad": 0
        },
        "pgo": {
          "median": 122.07245635986328,
          "mad": 0
        },
        "pc": {
          "median": 61.03586959838867,
          "mad": 0
        },
        "v8": {
          "median": 61.03586959838867,
          "mad": 0
        }
      }
    },
    {
      "name": "Record churn under GC",
      "unit": "Mrecords/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 57.43807940356922,
          "mad": 3.123698139699421
        },
        "omimalloc": {
          "median": 56.27486169431714,
          "mad": 1.4219930833881769
        },
        "c20": {
          "median": 57.39048143352484,
          "mad": 0.6597474031893853
        },
        "lto": {
          "median": 60.187156807394956,
          "mad": 0.18220731102539744
        },
        "znver5": {
          "median": 56.110799352362264,
          "mad": 1.1659237390739072
        },
        "clang23": {
          "median": 57.26113493827766,
          "mad": 1.8533441286293773
        },
        "pgo": {
          "median": 58.949287712823,
          "mad": 0.29630503379506123
        },
        "pc": {
          "median": 105.93267703986987,
          "mad": 0.605276183519635
        },
        "v8": {
          "median": 107.15252974288748,
          "mad": 1.2324856659739112
        }
      }
    },
    {
      "name": "Scavenge pause p50",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 1.952911376953125,
          "mad": 0.2134084701538086
        },
        "omimalloc": {
          "median": 2.047144889831543,
          "mad": 0.1153573989868164
        },
        "c20": {
          "median": 1.9195184707641602,
          "mad": 0.11632347106933594
        },
        "lto": {
          "median": 1.7616281509399414,
          "mad": 0.022600173950195312
        },
        "znver5": {
          "median": 2.102786064147949,
          "mad": 0.08295536041259766
        },
        "clang23": {
          "median": 2.0451221466064453,
          "mad": 0.09799385070800781
        },
        "pgo": {
          "median": 1.8683853149414062,
          "mad": 0.045577049255371094
        },
        "pc": {
          "median": 1.5142097473144531,
          "mad": 0.021140098571777344
        },
        "v8": {
          "median": 1.4640722274780273,
          "mad": 0.05948162078857422
        }
      }
    },
    {
      "name": "Scavenge pause p99",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 2.729893684387207,
          "mad": 0.015189170837402344
        },
        "omimalloc": {
          "median": 3.051325798034668,
          "mad": 0.10318565368652344
        },
        "c20": {
          "median": 2.730320930480957,
          "mad": 0.15900707244873047
        },
        "lto": {
          "median": 2.871458053588867,
          "mad": 0.15663623809814453
        },
        "znver5": {
          "median": 3.0053577423095703,
          "mad": 0.20136070251464844
        },
        "clang23": {
          "median": 2.7573328018188477,
          "mad": 0.048348426818847656
        },
        "pgo": {
          "median": 2.511317253112793,
          "mad": 0.07884597778320312
        },
        "pc": {
          "median": 1.700364112854004,
          "mad": 0.023189544677734375
        },
        "v8": {
          "median": 1.6948518753051758,
          "mad": 0.008758544921875
        }
      }
    },
    {
      "name": "Scavenge pause max",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 2.9846935272216797,
          "mad": 0.07979965209960938
        },
        "omimalloc": {
          "median": 4.427663803100586,
          "mad": 0.2118234634399414
        },
        "c20": {
          "median": 4.297597885131836,
          "mad": 0.18873977661132812
        },
        "lto": {
          "median": 3.3512516021728516,
          "mad": 0.43862247467041016
        },
        "znver5": {
          "median": 3.8803558349609375,
          "mad": 0.03116321563720703
        },
        "clang23": {
          "median": 3.635526657104492,
          "mad": 0.6635274887084961
        },
        "pgo": {
          "median": 3.1376466751098633,
          "mad": 0.39437198638916016
        },
        "pc": {
          "median": 1.801264762878418,
          "mad": 0.06508541107177734
        },
        "v8": {
          "median": 1.820016860961914,
          "mad": 0.048010826110839844
        }
      }
    },
    {
      "name": "Major GCs observed",
      "unit": "collections",
      "better": "lower",
      "values": {
        "official": {
          "median": 4,
          "mad": 0
        },
        "omimalloc": {
          "median": 4,
          "mad": 0
        },
        "c20": {
          "median": 5,
          "mad": 0
        },
        "lto": {
          "median": 5,
          "mad": 0
        },
        "znver5": {
          "median": 4.5,
          "mad": 0.5
        },
        "clang23": {
          "median": 4.5,
          "mad": 0.5
        },
        "pgo": {
          "median": 5,
          "mad": 0
        },
        "pc": {
          "median": 0,
          "mad": 0
        },
        "v8": {
          "median": 0,
          "mad": 0
        }
      }
    },
    {
      "name": "Major GC pause max, observed",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 6.698312759399414,
          "mad": 0.36547183990478516
        },
        "omimalloc": {
          "median": 6.178911209106445,
          "mad": 0.2323322296142578
        },
        "c20": {
          "median": 5.941850662231445,
          "mad": 1.109405517578125
        },
        "lto": {
          "median": 6.3381500244140625,
          "mad": 0.08006668090820312
        },
        "znver5": {
          "median": 6.000705718994141,
          "mad": 0.12787437438964844
        },
        "clang23": {
          "median": 5.923910140991211,
          "mad": 0.1507568359375
        },
        "pgo": {
          "median": 5.5120344161987305,
          "mad": 0.0949087142944336
        },
        "pc": {
          "median": 0,
          "mad": 0
        },
        "v8": {
          "median": 0,
          "mad": 0
        }
      }
    },
    {
      "name": "GC time share",
      "unit": "% of wall clock",
      "better": "lower",
      "values": {
        "official": {
          "median": 59.121704752071636,
          "mad": 1.462914130542476
        },
        "omimalloc": {
          "median": 60.14344273668366,
          "mad": 1.4050734032154892
        },
        "c20": {
          "median": 58.688473018272525,
          "mad": 1.5489795527287171
        },
        "lto": {
          "median": 58.394312197861495,
          "mad": 0.1412558394074921
        },
        "znver5": {
          "median": 61.17253783523138,
          "mad": 0.4594465028088024
        },
        "clang23": {
          "median": 60.74563026321754,
          "mad": 0.7944553486961539
        },
        "pgo": {
          "median": 59.02223770986767,
          "mad": 0.6332571209409608
        },
        "pc": {
          "median": 38.13355445761465,
          "mad": 0.36576071470165417
        },
        "v8": {
          "median": 37.76933230457756,
          "mad": 0.6717826725941087
        }
      }
    },
    {
      "name": "Event loop delay p50 under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 1.006335,
          "mad": 0.008960000000000079
        },
        "omimalloc": {
          "median": 1.005311,
          "mad": 0.0043520000000000225
        },
        "c20": {
          "median": 1.010943,
          "mad": 0.0020480000000000498
        },
        "lto": {
          "median": 1.010431,
          "mad": 0.007424000000000097
        },
        "znver5": {
          "median": 1.0158070000000001,
          "mad": 0.0012800000000001699
        },
        "clang23": {
          "median": 1.013503,
          "mad": 0.008960000000000079
        },
        "pgo": {
          "median": 1.015039,
          "mad": 0.008448000000000011
        },
        "pc": {
          "median": 1.019647,
          "mad": 0.0015360000000000928
        },
        "v8": {
          "median": 1.027839,
          "mad": 0.0038399999999999546
        }
      }
    },
    {
      "name": "Event loop delay p99 under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 4.954110999999999,
          "mad": 0.15360000000000085
        },
        "omimalloc": {
          "median": 4.524031,
          "mad": 0.08396800000000004
        },
        "c20": {
          "median": 4.720639,
          "mad": 0.010240000000000027
        },
        "lto": {
          "median": 4.659199,
          "mad": 0.15155200000000013
        },
        "znver5": {
          "median": 4.904959,
          "mad": 0.15974399999999989
        },
        "clang23": {
          "median": 4.698111,
          "mad": 0.35430399999999995
        },
        "pgo": {
          "median": 4.127743,
          "mad": 0.21196800000000016
        },
        "pc": {
          "median": 2.5395190000000003,
          "mad": 0.015359999999999818
        },
        "v8": {
          "median": 2.541567,
          "mad": 0.023551999999999795
        }
      }
    },
    {
      "name": "Event loop delay p99.9 under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 6.889471,
          "mad": 0.6983680000000003
        },
        "omimalloc": {
          "median": 6.606847,
          "mad": 0.28671999999999986
        },
        "c20": {
          "median": 7.174143,
          "mad": 0.14335999999999993
        },
        "lto": {
          "median": 6.893567,
          "mad": 0.5836799999999998
        },
        "znver5": {
          "median": 6.838271000000001,
          "mad": 0.7086080000000003
        },
        "clang23": {
          "median": 7.440383000000001,
          "mad": 0.6778880000000003
        },
        "pgo": {
          "median": 6.897663,
          "mad": 0.19660800000000034
        },
        "pc": {
          "median": 2.6460150000000002,
          "mad": 0.012288000000000077
        },
        "v8": {
          "median": 2.663423,
          "mad": 0.01126399999999994
        }
      }
    },
    {
      "name": "Event loop delay max under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 8.173567,
          "mad": 0.9707520000000001
        },
        "omimalloc": {
          "median": 8.042494999999999,
          "mad": 1.1673599999999995
        },
        "c20": {
          "median": 8.445951,
          "mad": 0.09420800000000096
        },
        "lto": {
          "median": 8.171519,
          "mad": 1.1468800000000003
        },
        "znver5": {
          "median": 9.555966999999999,
          "mad": 0.6266880000000015
        },
        "clang23": {
          "median": 9.308159,
          "mad": 2.0172800000000004
        },
        "pgo": {
          "median": 8.437759,
          "mad": 0.7987199999999994
        },
        "pc": {
          "median": 2.826239,
          "mad": 0.1361920000000001
        },
        "v8": {
          "median": 2.9747190000000003,
          "mad": 0.10956800000000033
        }
      }
    },
    {
      "name": "Full GC pause, 1M live records",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 58.999149999999986,
          "mad": 0.13925449999999273
        },
        "omimalloc": {
          "median": 59.00588200000004,
          "mad": 0.3628245000001016
        },
        "c20": {
          "median": 59.7234545,
          "mad": 0.19936999999993077
        },
        "lto": {
          "median": 59.20396349999987,
          "mad": 0.4613479999999299
        },
        "znver5": {
          "median": 60.4906064999999,
          "mad": 1.7621664999999211
        },
        "clang23": {
          "median": 58.448723499999915,
          "mad": 0.8258630000000267
        },
        "pgo": {
          "median": 46.360464500000035,
          "mad": 0.06935999999996056
        },
        "pc": {
          "median": 45.550136000000066,
          "mad": 0.22294699999997647
        },
        "v8": {
          "median": 47.89712650000013,
          "mad": 1.2426470000000336
        }
      }
    },
    {
      "name": "Live heap at full GC",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 114.79004287719727,
          "mad": 0.00164031982421875
        },
        "omimalloc": {
          "median": 114.78984832763672,
          "mad": 0.0005035400390625
        },
        "c20": {
          "median": 114.78770446777344,
          "mad": 0.0016632080078125
        },
        "lto": {
          "median": 114.79115676879883,
          "mad": 0.001140594482421875
        },
        "znver5": {
          "median": 114.77774810791016,
          "mad": 0.011058807373046875
        },
        "clang23": {
          "median": 114.77571105957031,
          "mad": 0.011425018310546875
        },
        "pgo": {
          "median": 114.77738571166992,
          "mad": 0.0103759765625
        },
        "pc": {
          "median": 58.90302848815918,
          "mad": 0.010517120361328125
        },
        "v8": {
          "median": 58.8922233581543,
          "mad": 0.0000171661376953125
        }
      }
    },
    {
      "name": "Deepstream parse record update",
      "unit": "Mmsg/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 18.57463855467857,
          "mad": 0.12114083086402161
        },
        "omimalloc": {
          "median": 18.563932031808587,
          "mad": 0.0256408214421473
        },
        "c20": {
          "median": 18.473604639126357,
          "mad": 0.09031784064350923
        },
        "lto": {
          "median": 18.454904405305037,
          "mad": 0.053784206401543244
        },
        "znver5": {
          "median": 18.141262459055636,
          "mad": 0.3907210728215311
        },
        "clang23": {
          "median": 18.18467482726456,
          "mad": 0.08416165716747237
        },
        "pgo": {
          "median": 18.383188509988322,
          "mad": 0.11640396358121663
        },
        "pc": {
          "median": 17.556253721955976,
          "mad": 0.04870760983781075
        },
        "v8": {
          "median": 17.45318406077581,
          "mad": 0.06875653039112528
        }
      }
    },
    {
      "name": "Deepstream parse general-domain update",
      "unit": "Mmsg/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 17.639923320691288,
          "mad": 0.04446365643529049
        },
        "omimalloc": {
          "median": 17.63836892595826,
          "mad": 0.0347235587086594
        },
        "c20": {
          "median": 17.499142009506052,
          "mad": 0.03168180288675693
        },
        "lto": {
          "median": 17.56524779908009,
          "mad": 0.014593177359634169
        },
        "znver5": {
          "median": 17.1929175949415,
          "mad": 0.3265813155042441
        },
        "clang23": {
          "median": 17.452025812044155,
          "mad": 0.01588568725568429
        },
        "pgo": {
          "median": 17.475291454141242,
          "mad": 0.19878688954313084
        },
        "pc": {
          "median": 17.2356835948667,
          "mad": 0.004456433843115448
        },
        "v8": {
          "median": 17.074360348363506,
          "mad": 0.027224126033818408
        }
      }
    },
    {
      "name": "Deepstream split 8-message frame",
      "unit": "Kframes/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1504.9705009974177,
          "mad": 11.389882188070942
        },
        "omimalloc": {
          "median": 1511.4285380157912,
          "mad": 6.615313539762042
        },
        "c20": {
          "median": 1528.3450618998363,
          "mad": 4.651396499726502
        },
        "lto": {
          "median": 1517.4250093923376,
          "mad": 2.0126538258991786
        },
        "znver5": {
          "median": 1531.9563875097765,
          "mad": 10.233938771812063
        },
        "clang23": {
          "median": 1526.7873814978268,
          "mad": 2.51817329035066
        },
        "pgo": {
          "median": 1515.6927830100772,
          "mad": 7.067823952214326
        },
        "pc": {
          "median": 1483.573944706643,
          "mad": 2.718932858078574
        },
        "v8": {
          "median": 1474.412005006257,
          "mad": 3.1668035798705887
        }
      }
    },
    {
      "name": "Deepstream build record update",
      "unit": "Mmsg/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 17.18483512350968,
          "mad": 0.48419127068462053
        },
        "omimalloc": {
          "median": 17.384154144476987,
          "mad": 0.03581959240735344
        },
        "c20": {
          "median": 17.43355642690608,
          "mad": 0.047204032897465
        },
        "lto": {
          "median": 17.779349893175194,
          "mad": 0.07591792395554542
        },
        "znver5": {
          "median": 17.633285055287736,
          "mad": 0.1113586121564758
        },
        "clang23": {
          "median": 18.039754555731385,
          "mad": 0.02654329544984435
        },
        "pgo": {
          "median": 18.439239582089584,
          "mad": 0.09704609163868128
        },
        "pc": {
          "median": 18.20970648765733,
          "mad": 0.024922111544423586
        },
        "v8": {
          "median": 18.180365054872922,
          "mad": 0.02881899754688355
        }
      }
    },
    {
      "name": "Deepstream part toString, 28 B name",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 22.687218346737765,
          "mad": 0.14865179694510644
        },
        "omimalloc": {
          "median": 22.697116760646935,
          "mad": 0.08171194515913172
        },
        "c20": {
          "median": 22.663815309091866,
          "mad": 0.05232877947479331
        },
        "lto": {
          "median": 23.27522652527047,
          "mad": 0.05312671480133524
        },
        "znver5": {
          "median": 22.79711568982786,
          "mad": 0.06567325413621106
        },
        "clang23": {
          "median": 23.877250155119608,
          "mad": 0.023039325079793116
        },
        "pgo": {
          "median": 24.592944578928687,
          "mad": 0.058078245999617195
        },
        "pc": {
          "median": 23.576009859419507,
          "mad": 0.2557608723216962
        },
        "v8": {
          "median": 23.977451182148855,
          "mad": 0.04275598959552873
        }
      }
    },
    {
      "name": "Deepstream part toString, 190 B value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 20.327471985516784,
          "mad": 0.08561650842539592
        },
        "omimalloc": {
          "median": 20.462867011908905,
          "mad": 0.06202789207162418
        },
        "c20": {
          "median": 20.520244917396504,
          "mad": 0.09562077206650699
        },
        "lto": {
          "median": 21.13426023062102,
          "mad": 0.04208123936116159
        },
        "znver5": {
          "median": 20.678948789881268,
          "mad": 0.11403136932138125
        },
        "clang23": {
          "median": 21.758046224230984,
          "mad": 0.02881292080164144
        },
        "pgo": {
          "median": 22.1272612437373,
          "mad": 0.2298019528194235
        },
        "pc": {
          "median": 21.481803747552377,
          "mad": 0.23856826222808714
        },
        "v8": {
          "median": 21.863909171457756,
          "mad": 0.12145723550196763
        }
      }
    },
    {
      "name": "Deepstream part toBuffer",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 48.115154733394824,
          "mad": 0.11268958679513119
        },
        "omimalloc": {
          "median": 48.25085928614911,
          "mad": 0.10533260828912816
        },
        "c20": {
          "median": 47.859870249812516,
          "mad": 0.20657695037886725
        },
        "lto": {
          "median": 47.73761297589094,
          "mad": 0.03543087106205434
        },
        "znver5": {
          "median": 47.22680660486998,
          "mad": 0.21322376274958543
        },
        "clang23": {
          "median": 47.632764168770805,
          "mad": 0.09994232203991515
        },
        "pgo": {
          "median": 47.6192602030158,
          "mad": 0.2112844605483346
        },
        "pc": {
          "median": 45.72589161557248,
          "mad": 0.4867040350414449
        },
        "v8": {
          "median": 46.718467031185924,
          "mad": 0.22454883252302338
        }
      }
    },
    {
      "name": "Deepstream typed() record value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 43.30488992181917,
          "mad": 0.11552857709031983
        },
        "omimalloc": {
          "median": 43.04653613675113,
          "mad": 0.00885230229526357
        },
        "c20": {
          "median": 43.081210557024136,
          "mad": 0.20300555576543644
        },
        "lto": {
          "median": 44.00542772372495,
          "mad": 0.22609880076132782
        },
        "znver5": {
          "median": 43.336296455459234,
          "mad": 0.20644819018375316
        },
        "clang23": {
          "median": 43.5477609536931,
          "mad": 0.037709286552466637
        },
        "pgo": {
          "median": 45.71167854983646,
          "mad": 0.027133595801100086
        },
        "pc": {
          "median": 43.16735382550445,
          "mad": 0.26757397096723423
        },
        "v8": {
          "median": 42.2198450735128,
          "mad": 0.12242657559369619
        }
      }
    }
  ]
}

| Benchmark | Unit | official | omimalloc | c20 | lto | znver5 | clang23 | pgo | pc | v8 | official→omimalloc | omimalloc→c20 | c20→lto | lto→znver5 | znver5→clang23 | clang23→pgo | pgo→pc | pc→v8 | official→v8 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Buffer.copy 64 B | Mops/s | 64.14 ± 0.20 | 63.99 ± 0.26 | 64.33 ± 0.03 | 64.32 ± 0.33 | 65.73 ± 0.42 | 66.38 ± 0.10 | 67.36 ± 0.08 | 65.18 ± 0.25 | 139.0 ± 0.24 | -0.2% | +0.5% | -0.0% | +2.2% | +1.0% | +1.5% | -3.2% | +113.3% | +116.7% |
| Buffer.copy 4 KiB | GiB/s | 117.6 ± 0.64 | 126.7 ± 1.52 | 127.3 ± 1.33 | 126.7 ± 0.74 | 126.6 ± 0.37 | 128.1 ± 0.51 | 128.8 ± 1.79 | 125.6 ± 0.90 | 166.6 ± 1.80 | +7.7% | +0.5% | -0.5% | -0.0% | +1.2% | +0.5% | -2.4% | +32.6% | +41.7% |
| Buffer.copy 16 KiB holdout | GiB/s | 201.1 ± 0.56 | 207.3 ± 0.83 | 206.7 ± 0.72 | 207.2 ± 0.65 | 207.8 ± 0.19 | 208.0 ± 0.91 | 209.9 ± 0.35 | 206.6 ± 0.91 | 229.6 ± 1.32 | +3.0% | -0.3% | +0.2% | +0.3% | +0.1% | +0.9% | -1.6% | +11.1% | +14.2% |
| Buffer.copy 128 KiB, storage chunk | GiB/s | 83.94 ± 0.71 | 81.49 ± 0.73 | 79.26 ± 2.19 | 81.85 ± 2.11 | 90.31 ± 0.79 | 85.54 ± 0.75 | 82.43 ± 0.32 | 84.35 ± 3.14 | 80.22 ± 0.52 | -2.9% | -2.7% | +3.3% | +10.3% | -5.3% | -3.6% | +2.3% | -4.9% | -4.4% |
| Buffer.copy 1 MiB | GiB/s | 57.97 ± 0.09 | 58.00 ± 0.03 | 58.03 ± 0.29 | 57.96 ± 0.17 | 58.22 ± 0.10 | 58.27 ± 0.14 | 58.34 ± 0.14 | 58.21 ± 0.07 | 58.16 ± 0.14 | +0.0% | +0.1% | -0.1% | +0.4% | +0.1% | +0.1% | -0.2% | -0.1% | +0.3% |
| Buffer.swap16 8 KiB holdout | GiB/s | 54.12 ± 0.40 | 52.75 ± 1.03 | 52.45 ± 0.73 | 51.93 ± 0.41 | 201.6 ± 2.98 | 203.1 ± 2.35 | 203.2 ± 1.05 | 199.8 ± 1.81 | 200.8 ± 2.79 | -2.5% | -0.6% | -1.0% | +288.3% | +0.7% | +0.0% | -1.7% | +0.5% | +271.0% |
| Buffer frame encode/decode 256 B | Mops/s | 32.29 ± 0.08 | 31.39 ± 0.16 | 31.55 ± 0.21 | 31.71 ± 0.13 | 32.04 ± 0.16 | 32.11 ± 0.34 | 32.57 ± 0.10 | 32.14 ± 0.36 | 48.72 ± 6.02 | -2.8% | +0.5% | +0.5% | +1.0% | +0.2% | +1.4% | -1.3% | +51.6% | +50.9% |
| Buffer.allocUnsafe 256 KiB chunk churn | Kops/s | 1,470 ± 18.93 | 2,121 ± 13.73 | 2,155 ± 42.53 | 2,143 ± 31.26 | 2,207 ± 21.29 | 2,260 ± 41.64 | 2,344 ± 35.71 | 2,251 ± 41.86 | 2,341 ± 37.09 | +44.3% | +1.6% | -0.6% | +3.0% | +2.4% | +3.7% | -3.9% | +4.0% | +59.3% |
| Buffer.concat 2 × 256 B | Mops/s | 10.85 ± 0.03 | 10.97 ± 0.04 | 11.03 ± 0.05 | 11.05 ± 0.01 | 11.11 ± 0.06 | 11.00 ± 0.04 | 11.17 ± 0.01 | 10.80 ± 0.02 | 10.81 ± 0.01 | +1.1% | +0.6% | +0.1% | +0.6% | -1.0% | +1.5% | -3.3% | +0.1% | -0.4% |
| SHA-256 1 MiB | GiB/s | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | +0.0% | -0.0% | -0.0% | -0.0% | -0.0% | +0.0% | +0.1% | -0.1% | +0.1% |
| SHA-256 128 KiB, storage chunk | GiB/s | 1.99 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.01 ± 0.00 | 2.00 ± 0.00 | 2.01 ± 0.00 | +0.2% | +0.0% | -0.0% | +0.1% | +0.0% | +0.2% | -0.1% | +0.0% | +0.6% |
| gzip level 1, 1 MiB | MiB/s | 2,363 ± 3.69 | 2,373 ± 0.25 | 2,329 ± 1.25 | 2,270 ± 1.37 | 2,470 ± 0.53 | 1,635 ± 0.53 | 1,546 ± 1.13 | 1,543 ± 5.71 | 1,545 ± 6.35 | +0.4% | -1.9% | -2.5% | +8.8% | -33.8% | -5.4% | -0.2% | +0.1% | -34.6% |
| gunzip 1 MiB | MiB/s | 2,064 ± 10.73 | 2,029 ± 23.35 | 2,036 ± 34.27 | 1,997 ± 6.88 | 2,070 ± 37.31 | 1,418 ± 4.27 | 1,455 ± 4.53 | 1,521 ± 6.95 | 1,494 ± 15.20 | -1.7% | +0.4% | -1.9% | +3.7% | -31.5% | +2.6% | +4.5% | -1.7% | -27.6% |
| JSON.parse 0.5 MiB | ops/s | 927.3 ± 6.68 | 924.3 ± 1.39 | 947.6 ± 14.32 | 911.4 ± 11.50 | 908.1 ± 5.54 | 903.9 ± 4.88 | 1,020 ± 9.63 | 1,043 ± 5.28 | 1,016 ± 4.49 | -0.3% | +2.5% | -3.8% | -0.4% | -0.5% | +12.8% | +2.2% | -2.6% | +9.5% |
| JSON.stringify 0.5 MiB | ops/s | 2,011 ± 6.62 | 2,018 ± 2.67 | 2,011 ± 0.69 | 1,988 ± 3.24 | 1,975 ± 9.37 | 2,007 ± 4.02 | 2,024 ± 3.10 | 1,976 ± 11.60 | 1,968 ± 9.40 | +0.3% | -0.3% | -1.2% | -0.7% | +1.6% | +0.9% | -2.4% | -0.4% | -2.1% |
| JSON.stringify record value | Mops/s | 19.43 ± 0.08 | 19.50 ± 0.00 | 19.35 ± 0.17 | 19.44 ± 0.13 | 19.75 ± 0.13 | 19.81 ± 0.11 | 20.94 ± 0.12 | 19.09 ± 0.16 | 17.96 ± 0.21 | +0.3% | -0.8% | +0.5% | +1.6% | +0.3% | +5.7% | -8.9% | -5.9% | -7.6% |
| JSON.stringify general domain | Mops/s | 5.36 ± 0.04 | 5.64 ± 0.04 | 5.66 ± 0.02 | 5.70 ± 0.01 | 5.56 ± 0.03 | 5.70 ± 0.02 | 6.07 ± 0.01 | 5.75 ± 0.03 | 5.74 ± 0.09 | +5.1% | +0.3% | +0.7% | -2.4% | +2.6% | +6.4% | -5.3% | -0.2% | +7.0% |
| JSON.stringify RPC message | Mops/s | 5.58 ± 0.13 | 5.94 ± 0.16 | 5.97 ± 0.05 | 5.99 ± 0.03 | 5.83 ± 0.09 | 6.00 ± 0.01 | 6.45 ± 0.01 | 6.23 ± 0.03 | 6.28 ± 0.02 | +6.5% | +0.5% | +0.3% | -2.7% | +2.9% | +7.5% | -3.4% | +0.9% | +12.6% |
| JSON.stringify 512-value batch | Kbatches/s | 44.81 ± 0.18 | 44.88 ± 0.09 | 43.74 ± 0.30 | 43.95 ± 0.47 | 43.97 ± 0.13 | 43.68 ± 0.13 | 46.83 ± 0.36 | 43.93 ± 0.14 | 41.78 ± 0.49 | +0.2% | -2.5% | +0.5% | +0.1% | -0.7% | +7.2% | -6.2% | -4.9% | -6.8% |
| JSON.parse record value | Mops/s | 9.01 ± 0.08 | 9.08 ± 0.05 | 9.03 ± 0.05 | 9.05 ± 0.03 | 9.04 ± 0.03 | 8.56 ± 0.04 | 11.09 ± 0.21 | 11.04 ± 0.03 | 10.98 ± 0.04 | +0.8% | -0.5% | +0.2% | -0.1% | -5.3% | +29.6% | -0.4% | -0.6% | +21.9% |
| JSON.parse general domain | Mops/s | 2.62 ± 0.01 | 2.63 ± 0.02 | 2.61 ± 0.02 | 2.56 ± 0.00 | 2.59 ± 0.02 | 2.44 ± 0.03 | 3.44 ± 0.03 | 3.32 ± 0.04 | 3.42 ± 0.04 | +0.3% | -0.9% | -1.9% | +1.2% | -6.0% | +41.1% | -3.3% | +3.0% | +30.3% |
| JSON.parse RPC message | Mops/s | 2.94 ± 0.01 | 2.90 ± 0.01 | 2.81 ± 0.03 | 2.82 ± 0.05 | 2.90 ± 0.00 | 2.76 ± 0.01 | 4.05 ± 0.01 | 4.02 ± 0.04 | 4.12 ± 0.01 | -1.4% | -2.9% | +0.4% | +2.6% | -4.6% | +46.4% | -0.7% | +2.4% | +40.2% |
| JSON.parse primitives 1 MiB | ops/s | 958.1 ± 1.32 | 958.4 ± 0.81 | 947.1 ± 3.14 | 941.9 ± 1.48 | 960.7 ± 1.38 | 987.8 ± 1.35 | 971.4 ± 0.54 | 1,001 ± 5.14 | 989.9 ± 4.12 | +0.0% | -1.2% | -0.6% | +2.0% | +2.8% | -1.7% | +3.0% | -1.1% | +3.3% |
| JSON.stringify primitives 1 MiB | ops/s | 1,266 ± 1.12 | 1,270 ± 2.15 | 1,240 ± 2.91 | 1,234 ± 5.85 | 1,239 ± 2.70 | 1,254 ± 1.24 | 1,425 ± 1.41 | 1,412 ± 2.77 | 1,433 ± 1.21 | +0.3% | -2.4% | -0.5% | +0.4% | +1.2% | +13.6% | -0.9% | +1.5% | +13.2% |
| JSON.parse escaped strings 1.8 MiB | ops/s | 518.5 ± 0.41 | 518.4 ± 1.18 | 516.3 ± 1.13 | 492.2 ± 0.61 | 501.2 ± 1.33 | 500.9 ± 0.90 | 615.9 ± 3.30 | 600.2 ± 0.66 | 605.1 ± 3.40 | -0.0% | -0.4% | -4.7% | +1.8% | -0.1% | +23.0% | -2.6% | +0.8% | +16.7% |
| JSON.stringify escaped strings 1.8 MiB | ops/s | 467.6 ± 0.37 | 749.0 ± 1.70 | 743.0 ± 1.01 | 735.8 ± 3.40 | 749.2 ± 2.25 | 742.4 ± 2.90 | 816.1 ± 0.85 | 520.2 ± 25.65 | 566.4 ± 0.54 | +60.2% | -0.8% | -1.0% | +1.8% | -0.9% | +9.9% | -36.3% | +8.9% | +21.1% |
| JSON.parse GeoJSON holdout | ops/s | 228.6 ± 1.78 | 227.4 ± 0.33 | 224.2 ± 0.53 | 208.8 ± 1.96 | 241.3 ± 1.16 | 244.1 ± 2.12 | 323.0 ± 2.44 | 310.2 ± 1.20 | 326.7 ± 0.66 | -0.6% | -1.4% | -6.9% | +15.6% | +1.2% | +32.3% | -4.0% | +5.3% | +42.9% |
| JSON.stringify GeoJSON holdout | ops/s | 302.4 ± 0.29 | 406.1 ± 0.74 | 370.9 ± 1.43 | 371.4 ± 0.48 | 385.1 ± 1.81 | 375.0 ± 6.74 | 423.1 ± 0.57 | 488.2 ± 2.70 | 496.0 ± 0.25 | +34.3% | -8.7% | +0.1% | +3.7% | -2.6% | +12.8% | +15.4% | +1.6% | +64.0% |
| HTTP/1.1 loopback, 64 connections | req/s | 48,944 ± 181.9 | 49,301 ± 78.96 | 49,044 ± 203.9 | 50,979 ± 740.7 | 51,431 ± 362.1 | 51,432 ± 113.5 | 60,763 ± 190.7 | 62,593 ± 161.4 | 62,262 ± 537.4 | +0.7% | -0.5% | +3.9% | +0.9% | +0.0% | +18.1% | +3.0% | -0.5% | +27.2% |
| HTTP/1.1 POST 4 KiB loopback, 64 connections | req/s | 43,121 ± 1,299 | 42,585 ± 747.5 | 44,132 ± 872.9 | 43,493 ± 252.5 | 45,403 ± 974.3 | 45,607 ± 1,483 | 49,561 ± 573.9 | 53,334 ± 185.8 | 53,309 ± 51.78 | -1.2% | +3.6% | -1.4% | +4.4% | +0.4% | +8.7% | +7.6% | -0.0% | +23.6% |
| HTTP/1.1 POST 64 KiB holdout, 16 connections | req/s | 15,977 ± 147.1 | 16,923 ± 162.0 | 16,605 ± 191.8 | 16,628 ± 61.75 | 16,821 ± 57.78 | 17,090 ± 107.0 | 18,472 ± 325.4 | 21,082 ± 394.5 | 21,225 ± 64.80 | +5.9% | -1.9% | +0.1% | +1.2% | +1.6% | +8.1% | +14.1% | +0.7% | +32.8% |
| HTTP/1.1 GET 4 KiB, 4 Workers on one reusePort socket, 64 connections | req/s | 69,496 ± 673.5 | 68,989 ± 409.2 | 69,721 ± 902.4 | 70,555 ± 181.5 | 72,434 ± 128.7 | 69,802 ± 398.4 | 80,443 ± 852.0 | 85,449 ± 2,444 | 85,373 ± 244.5 | -0.7% | +1.1% | +1.2% | +2.7% | -3.6% | +15.2% | +6.2% | -0.1% | +22.8% |
| Process startup | ms | 11.29 ± 0.11 | 11.55 ± 0.01 | 12.17 ± 0.04 | 12.17 ± 0.05 | 12.27 ± 0.11 | 12.38 ± 0.29 | 11.02 ± 0.03 | 10.45 ± 0.05 | 10.48 ± 0.05 | -2.3% | -5.4% | -0.0% | -0.8% | -0.9% | +11.0% | +5.2% | -0.3% | +7.2% |
| RSS after 512 MiB Buffer churn | MiB | 62.79 ± 0.20 | 578.8 ± 0.24 | 581.6 ± 0.13 | 580.5 ± 0.07 | 580.5 ± 0.29 | 581.6 ± 0.12 | 572.5 ± 0.11 | 569.2 ± 0.19 | 569.3 ± 0.01 | -821.8% | -0.5% | +0.2% | -0.0% | -0.2% | +1.6% | +0.6% | -0.0% | -806.6% |
| RSS retained above baseline | MiB | 0.20 ± 0.20 | 513.0 ± 0.00 | 513.3 ± 0.25 | 513.5 ± 0.00 | 513.3 ± 0.25 | 513.5 ± 0.03 | 513.5 ± 0.00 | 514.0 ± 0.00 | 514.0 ± 0.00 | -252453.8% | -0.1% | -0.0% | +0.0% | -0.1% | +0.0% | -0.1% | +0.0% | -252946.2% |
| Committed RSS at churn peak | MiB | 513.5 ± 0.00 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.5 ± 0.00 | 513.8 ± 0.25 | 514.0 ± 0.00 | +0.1% | +0.0% | +0.0% | +0.0% | +0.0% | -0.1% | -0.0% | -0.0% | -0.1% |
| Allocate 2M-object graph | Mobjects/s | 13.72 ± 0.47 | 13.79 ± 0.21 | 14.10 ± 0.08 | 14.35 ± 0.05 | 13.99 ± 0.02 | 14.21 ± 0.14 | 16.05 ± 0.24 | 36.19 ± 0.75 | 38.88 ± 0.56 | +0.5% | +2.2% | +1.8% | -2.5% | +1.6% | +12.9% | +125.5% | +7.4% | +183.4% |
| RSS for 2M-object graph | MiB | 193.9 ± 8.16 | 183.5 ± 2.75 | 183.5 ± 0.00 | 180.0 ± 0.25 | 181.8 ± 1.50 | 179.0 ± 1.00 | 181.0 ± 0.75 | 71.25 ± 0.25 | 72.00 ± 0.75 | +5.4% | +0.0% | +1.9% | -1.0% | +1.5% | -1.1% | +60.6% | -1.1% | +62.9% |
| V8 heap for 2M-object graph | MiB | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 61.04 ± 0.00 | 61.04 ± 0.00 | +0.0% | +0.0% | -0.0% | +0.0% | +0.0% | -0.0% | +50.0% | +0.0% | +50.0% |
| Record churn under GC | Mrecords/s | 57.44 ± 3.12 | 56.27 ± 1.42 | 57.39 ± 0.66 | 60.19 ± 0.18 | 56.11 ± 1.17 | 57.26 ± 1.85 | 58.95 ± 0.30 | 105.9 ± 0.61 | 107.2 ± 1.23 | -2.0% | +2.0% | +4.9% | -6.8% | +2.1% | +2.9% | +79.7% | +1.2% | +86.6% |
| Scavenge pause p50 | ms | 1.95 ± 0.21 | 2.05 ± 0.12 | 1.92 ± 0.12 | 1.76 ± 0.02 | 2.10 ± 0.08 | 2.05 ± 0.10 | 1.87 ± 0.05 | 1.51 ± 0.02 | 1.46 ± 0.06 | -4.8% | +6.2% | +8.2% | -19.4% | +2.7% | +8.6% | +19.0% | +3.3% | +25.0% |
| Scavenge pause p99 | ms | 2.73 ± 0.02 | 3.05 ± 0.10 | 2.73 ± 0.16 | 2.87 ± 0.16 | 3.01 ± 0.20 | 2.76 ± 0.05 | 2.51 ± 0.08 | 1.70 ± 0.02 | 1.69 ± 0.01 | -11.8% | +10.5% | -5.2% | -4.7% | +8.3% | +8.9% | +32.3% | +0.3% | +37.9% |
| Scavenge pause max | ms | 2.98 ± 0.08 | 4.43 ± 0.21 | 4.30 ± 0.19 | 3.35 ± 0.44 | 3.88 ± 0.03 | 3.64 ± 0.66 | 3.14 ± 0.39 | 1.80 ± 0.07 | 1.82 ± 0.05 | -48.3% | +2.9% | +22.0% | -15.8% | +6.3% | +13.7% | +42.6% | -1.0% | +39.0% |
| Major GCs observed | collections | 4.00 ± 0.00 | 4.00 ± 0.00 | 5.00 ± 0.00 | 5.00 ± 0.00 | 4.50 ± 0.50 | 4.50 ± 0.50 | 5.00 ± 0.00 | 0.00 ± 0.00 | 0.00 ± 0.00 | +0.0% | -25.0% | +0.0% | +10.0% | +0.0% | -11.1% | n/a | n/a | n/a |
| Major GC pause max, observed | ms | 6.70 ± 0.37 | 6.18 ± 0.23 | 5.94 ± 1.11 | 6.34 ± 0.08 | 6.00 ± 0.13 | 5.92 ± 0.15 | 5.51 ± 0.09 | 0.00 ± 0.00 | 0.00 ± 0.00 | +7.8% | +3.8% | -6.7% | +5.3% | +1.3% | +7.0% | n/a | n/a | n/a |
| GC time share | % of wall clock | 59.12 ± 1.46 | 60.14 ± 1.41 | 58.69 ± 1.55 | 58.39 ± 0.14 | 61.17 ± 0.46 | 60.75 ± 0.79 | 59.02 ± 0.63 | 38.13 ± 0.37 | 37.77 ± 0.67 | -1.7% | +2.4% | +0.5% | -4.8% | +0.7% | +2.8% | +35.4% | +1.0% | +36.1% |
| Event loop delay p50 under churn | ms | 1.01 ± 0.01 | 1.01 ± 0.00 | 1.01 ± 0.00 | 1.01 ± 0.01 | 1.02 ± 0.00 | 1.01 ± 0.01 | 1.02 ± 0.01 | 1.02 ± 0.00 | 1.03 ± 0.00 | +0.1% | -0.6% | +0.1% | -0.5% | +0.2% | -0.2% | -0.5% | -0.8% | -2.1% |
| Event loop delay p99 under churn | ms | 4.95 ± 0.15 | 4.52 ± 0.08 | 4.72 ± 0.01 | 4.66 ± 0.15 | 4.90 ± 0.16 | 4.70 ± 0.35 | 4.13 ± 0.21 | 2.54 ± 0.02 | 2.54 ± 0.02 | +8.7% | -4.3% | +1.3% | -5.3% | +4.2% | +12.1% | +38.5% | -0.1% | +48.7% |
| Event loop delay p99.9 under churn | ms | 6.89 ± 0.70 | 6.61 ± 0.29 | 7.17 ± 0.14 | 6.89 ± 0.58 | 6.84 ± 0.71 | 7.44 ± 0.68 | 6.90 ± 0.20 | 2.65 ± 0.01 | 2.66 ± 0.01 | +4.1% | -8.6% | +3.9% | +0.8% | -8.8% | +7.3% | +61.6% | -0.7% | +61.3% |
| Event loop delay max under churn | ms | 8.17 ± 0.97 | 8.04 ± 1.17 | 8.45 ± 0.09 | 8.17 ± 1.15 | 9.56 ± 0.63 | 9.31 ± 2.02 | 8.44 ± 0.80 | 2.83 ± 0.14 | 2.97 ± 0.11 | +1.6% | -5.0% | +3.2% | -16.9% | +2.6% | +9.4% | +66.5% | -5.3% | +63.6% |
| Full GC pause, 1M live records | ms | 59.00 ± 0.14 | 59.01 ± 0.36 | 59.72 ± 0.20 | 59.20 ± 0.46 | 60.49 ± 1.76 | 58.45 ± 0.83 | 46.36 ± 0.07 | 45.55 ± 0.22 | 47.90 ± 1.24 | -0.0% | -1.2% | +0.9% | -2.2% | +3.4% | +20.7% | +1.7% | -5.2% | +18.8% |
| Live heap at full GC | MiB | 114.8 ± 0.00 | 114.8 ± 0.00 | 114.8 ± 0.00 | 114.8 ± 0.00 | 114.8 ± 0.01 | 114.8 ± 0.01 | 114.8 ± 0.01 | 58.90 ± 0.01 | 58.89 ± 0.00 | +0.0% | +0.0% | -0.0% | +0.0% | +0.0% | -0.0% | +48.7% | +0.0% | +48.7% |
| Deepstream parse record update | Mmsg/s | 18.57 ± 0.12 | 18.56 ± 0.03 | 18.47 ± 0.09 | 18.45 ± 0.05 | 18.14 ± 0.39 | 18.18 ± 0.08 | 18.38 ± 0.12 | 17.56 ± 0.05 | 17.45 ± 0.07 | -0.1% | -0.5% | -0.1% | -1.7% | +0.2% | +1.1% | -4.5% | -0.6% | -6.0% |
| Deepstream parse general-domain update | Mmsg/s | 17.64 ± 0.04 | 17.64 ± 0.03 | 17.50 ± 0.03 | 17.57 ± 0.01 | 17.19 ± 0.33 | 17.45 ± 0.02 | 17.48 ± 0.20 | 17.24 ± 0.00 | 17.07 ± 0.03 | -0.0% | -0.8% | +0.4% | -2.1% | +1.5% | +0.1% | -1.4% | -0.9% | -3.2% |
| Deepstream split 8-message frame | Kframes/s | 1,505 ± 11.39 | 1,511 ± 6.62 | 1,528 ± 4.65 | 1,517 ± 2.01 | 1,532 ± 10.23 | 1,527 ± 2.52 | 1,516 ± 7.07 | 1,484 ± 2.72 | 1,474 ± 3.17 | +0.4% | +1.1% | -0.7% | +1.0% | -0.3% | -0.7% | -2.1% | -0.6% | -2.0% |
| Deepstream build record update | Mmsg/s | 17.18 ± 0.48 | 17.38 ± 0.04 | 17.43 ± 0.05 | 17.78 ± 0.08 | 17.63 ± 0.11 | 18.04 ± 0.03 | 18.44 ± 0.10 | 18.21 ± 0.02 | 18.18 ± 0.03 | +1.2% | +0.3% | +2.0% | -0.8% | +2.3% | +2.2% | -1.2% | -0.2% | +5.8% |
| Deepstream part toString, 28 B name | Mops/s | 22.69 ± 0.15 | 22.70 ± 0.08 | 22.66 ± 0.05 | 23.28 ± 0.05 | 22.80 ± 0.07 | 23.88 ± 0.02 | 24.59 ± 0.06 | 23.58 ± 0.26 | 23.98 ± 0.04 | +0.0% | -0.1% | +2.7% | -2.1% | +4.7% | +3.0% | -4.1% | +1.7% | +5.7% |
| Deepstream part toString, 190 B value | Mops/s | 20.33 ± 0.09 | 20.46 ± 0.06 | 20.52 ± 0.10 | 21.13 ± 0.04 | 20.68 ± 0.11 | 21.76 ± 0.03 | 22.13 ± 0.23 | 21.48 ± 0.24 | 21.86 ± 0.12 | +0.7% | +0.3% | +3.0% | -2.2% | +5.2% | +1.7% | -2.9% | +1.8% | +7.6% |
| Deepstream part toBuffer | Mops/s | 48.12 ± 0.11 | 48.25 ± 0.11 | 47.86 ± 0.21 | 47.74 ± 0.04 | 47.23 ± 0.21 | 47.63 ± 0.10 | 47.62 ± 0.21 | 45.73 ± 0.49 | 46.72 ± 0.22 | +0.3% | -0.8% | -0.3% | -1.1% | +0.9% | -0.0% | -4.0% | +2.2% | -2.9% |
| Deepstream typed() record value | Mops/s | 43.30 ± 0.12 | 43.05 ± 0.01 | 43.08 ± 0.20 | 44.01 ± 0.23 | 43.34 ± 0.21 | 43.55 ± 0.04 | 45.71 ± 0.03 | 43.17 ± 0.27 | 42.22 ± 0.12 | -0.6% | +0.1% | +2.1% | -1.5% | +0.5% | +5.0% | -5.6% | -2.2% | -2.5% |
