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
    "clang23": {
      "image": "nxtedition/node:ab-26.10.0-nolto-nopatch",
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
    "v8patch": {
      "image": "nxtedition/node:ab-26.10.0-nolto",
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
      "image": "nxtedition/node:ab-26.10.0-base",
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
    "march": {
      "image": "nxtedition/node:ab-26.10.0-march",
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
      "image": "nxtedition/node:26.10.0",
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
      "image": "nxtedition/node:26.10.0-pc",
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
          "median": 62.729397714568634,
          "mad": 1.0309462799743514
        },
        "omimalloc": {
          "median": 62.85610812975295,
          "mad": 0.36512358378351806
        },
        "clang23": {
          "median": 63.17600316414675,
          "mad": 0.2279267564225762
        },
        "v8patch": {
          "median": 95.89956026491106,
          "mad": 0.2228552288988226
        },
        "lto": {
          "median": 97.75176868933154,
          "mad": 0.09446813802359344
        },
        "march": {
          "median": 95.38439836832244,
          "mad": 0.05218486256255517
        },
        "pgo": {
          "median": 133.53538622597773,
          "mad": 0.08505290209910754
        },
        "pc": {
          "median": 131.69808186861684,
          "mad": 0.233333304030225
        }
      }
    },
    {
      "name": "Buffer.copy 4 KiB",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 118.42024874298005,
          "mad": 1.9064022440182669
        },
        "omimalloc": {
          "median": 126.53408484909187,
          "mad": 1.5208569962483836
        },
        "clang23": {
          "median": 126.19714273155785,
          "mad": 0.6118011346234269
        },
        "v8patch": {
          "median": 150.172834591193,
          "mad": 3.2130140094921273
        },
        "lto": {
          "median": 149.4886456950981,
          "mad": 1.621478337867572
        },
        "march": {
          "median": 152.97813198826074,
          "mad": 3.347948560387806
        },
        "pgo": {
          "median": 166.93128770436493,
          "mad": 1.6193880561838654
        },
        "pc": {
          "median": 163.05555984890728,
          "mad": 0.8757160288758854
        }
      }
    },
    {
      "name": "Buffer.copy 16 KiB holdout",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 201.52249888664977,
          "mad": 0.527643162481013
        },
        "omimalloc": {
          "median": 206.636687406725,
          "mad": 0.9635645868502678
        },
        "clang23": {
          "median": 207.1315258448443,
          "mad": 0.2800001963142762
        },
        "v8patch": {
          "median": 222.7538078151561,
          "mad": 0.6880472382380844
        },
        "lto": {
          "median": 220.94489185846942,
          "mad": 0.6701329224192278
        },
        "march": {
          "median": 223.4342021367298,
          "mad": 1.6259061333357465
        },
        "pgo": {
          "median": 230.23950880218106,
          "mad": 0.401842807900195
        },
        "pc": {
          "median": 228.80020037383056,
          "mad": 0.8130714129989514
        }
      }
    },
    {
      "name": "Buffer.copy 128 KiB, storage chunk",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 81.01482373155183,
          "mad": 0.14039848166646607
        },
        "omimalloc": {
          "median": 83.38379238233986,
          "mad": 1.9890566675557224
        },
        "clang23": {
          "median": 87.26406287891584,
          "mad": 0.6624362758346436
        },
        "v8patch": {
          "median": 80.15526666909068,
          "mad": 0.6439163147474929
        },
        "lto": {
          "median": 80.56165264738664,
          "mad": 0.8932990105130614
        },
        "march": {
          "median": 74.11741042341079,
          "mad": 0.20744762197902844
        },
        "pgo": {
          "median": 78.62053950291863,
          "mad": 1.5106303025054757
        },
        "pc": {
          "median": 77.11809218296729,
          "mad": 0.11755198871275496
        }
      }
    },
    {
      "name": "Buffer.copy 1 MiB",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 57.99645410546398,
          "mad": 0.15395741744271163
        },
        "omimalloc": {
          "median": 58.03983030828131,
          "mad": 0.047877114705976
        },
        "clang23": {
          "median": 58.178358541278634,
          "mad": 0.10286695249402555
        },
        "v8patch": {
          "median": 58.34572721757769,
          "mad": 0.12735327032828891
        },
        "lto": {
          "median": 58.182256597826566,
          "mad": 0.18330442477036613
        },
        "march": {
          "median": 58.19332715359907,
          "mad": 0.050308240949519245
        },
        "pgo": {
          "median": 58.26168322672358,
          "mad": 0.124879577140387
        },
        "pc": {
          "median": 58.082553470542436,
          "mad": 0.17088069384304205
        }
      }
    },
    {
      "name": "Buffer.swap16 8 KiB holdout",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 53.148405340125926,
          "mad": 0.652436444136054
        },
        "omimalloc": {
          "median": 51.72754170913505,
          "mad": 0.6017892975730845
        },
        "clang23": {
          "median": 52.6379901474006,
          "mad": 1.3280695466715713
        },
        "v8patch": {
          "median": 51.09649962530983,
          "mad": 0.13254695739545497
        },
        "lto": {
          "median": 52.045266802094815,
          "mad": 0.5080107762296606
        },
        "march": {
          "median": 139.04156512285084,
          "mad": 0.534317623540943
        },
        "pgo": {
          "median": 151.5797767492491,
          "mad": 0.5228924127004717
        },
        "pc": {
          "median": 142.36082171005808,
          "mad": 1.6455340703738415
        }
      }
    },
    {
      "name": "Buffer frame encode/decode 256 B",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 31.93825975389116,
          "mad": 0.11259744288166118
        },
        "omimalloc": {
          "median": 30.948349641351246,
          "mad": 0.37542552268215523
        },
        "clang23": {
          "median": 31.518155136394327,
          "mad": 0.16696485968509656
        },
        "v8patch": {
          "median": 46.95380631182953,
          "mad": 0.17683443648259
        },
        "lto": {
          "median": 46.02776076629088,
          "mad": 0.7335140002072968
        },
        "march": {
          "median": 47.14888547487084,
          "mad": 0.17739196137423363
        },
        "pgo": {
          "median": 54.209124905881964,
          "mad": 0.5797621413867589
        },
        "pc": {
          "median": 48.00945952415941,
          "mad": 5.4809057094990195
        }
      }
    },
    {
      "name": "Buffer.allocUnsafe 256 KiB chunk churn",
      "unit": "Kops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1453.7642823358829,
          "mad": 21.039010315291875
        },
        "omimalloc": {
          "median": 2088.4872280062755,
          "mad": 13.185937645403556
        },
        "clang23": {
          "median": 2169.81741102473,
          "mad": 14.636419892937738
        },
        "v8patch": {
          "median": 2184.907076869723,
          "mad": 21.87953102168808
        },
        "lto": {
          "median": 2184.95181614191,
          "mad": 45.25080458272305
        },
        "march": {
          "median": 2148.492093767735,
          "mad": 10.779045463084913
        },
        "pgo": {
          "median": 2296.375635513809,
          "mad": 4.08040068205878
        },
        "pc": {
          "median": 2315.425341225255,
          "mad": 21.885567198809213
        }
      }
    },
    {
      "name": "Buffer.concat 2 × 256 B",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 10.83866204247569,
          "mad": 0.13774063226603062
        },
        "omimalloc": {
          "median": 10.943671654084525,
          "mad": 0.09887720314427284
        },
        "clang23": {
          "median": 10.986573786765039,
          "mad": 0.06480026078135648
        },
        "v8patch": {
          "median": 10.997588600412215,
          "mad": 0.03403401029797681
        },
        "lto": {
          "median": 11.077835675765336,
          "mad": 0.025456350199182687
        },
        "march": {
          "median": 11.089882588754854,
          "mad": 0.09842521160666706
        },
        "pgo": {
          "median": 11.24138905496771,
          "mad": 0.044051552593304955
        },
        "pc": {
          "median": 10.81826353383682,
          "mad": 0.06080182743958229
        }
      }
    },
    {
      "name": "SHA-256 1 MiB",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2.0286019308633563,
          "mad": 0.0009842262544328406
        },
        "omimalloc": {
          "median": 2.029161849260541,
          "mad": 0.0007795002197055201
        },
        "clang23": {
          "median": 2.0287705874805337,
          "mad": 0.0006570010956130634
        },
        "v8patch": {
          "median": 2.0297584644832547,
          "mad": 0.0005664259999795807
        },
        "lto": {
          "median": 2.0305971874523294,
          "mad": 0.00038763927688179045
        },
        "march": {
          "median": 2.0304168821588195,
          "mad": 0.00011236996708086089
        },
        "pgo": {
          "median": 2.0304856022907707,
          "mad": 0.00028875723753007954
        },
        "pc": {
          "median": 2.0316946396365596,
          "mad": 0.0009095301294677061
        }
      }
    },
    {
      "name": "SHA-256 128 KiB, storage chunk",
      "unit": "GiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1.9930666289773038,
          "mad": 0.0014133232618015468
        },
        "omimalloc": {
          "median": 1.99948060377677,
          "mad": 0.0006614988875744965
        },
        "clang23": {
          "median": 2.0003411142836005,
          "mad": 0.00016551114339313777
        },
        "v8patch": {
          "median": 2.000382728772316,
          "mad": 0.0005674363497454316
        },
        "lto": {
          "median": 2.001847246175143,
          "mad": 0.0005307498947479949
        },
        "march": {
          "median": 2.0026296102104713,
          "mad": 0.00047711905073666294
        },
        "pgo": {
          "median": 2.006897554343359,
          "mad": 0.0005038404682919939
        },
        "pc": {
          "median": 2.0052958007154915,
          "mad": 0.0005987638542972462
        }
      }
    },
    {
      "name": "gzip level 1, 1 MiB",
      "unit": "MiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2363.5045711211314,
          "mad": 6.246344798999871
        },
        "omimalloc": {
          "median": 2367.2991421474853,
          "mad": 1.7522073636989717
        },
        "clang23": {
          "median": 2482.3221856564137,
          "mad": 4.138928257651287
        },
        "v8patch": {
          "median": 2482.4597312041933,
          "mad": 2.5745600670982185
        },
        "lto": {
          "median": 2434.736982303476,
          "mad": 0.5150343395825985
        },
        "march": {
          "median": 2442.9932823401496,
          "mad": 3.4396354954628805
        },
        "pgo": {
          "median": 2249.8470164187606,
          "mad": 2.9739497857062815
        },
        "pc": {
          "median": 2260.8710369826804,
          "mad": 3.669204552668816
        }
      }
    },
    {
      "name": "gunzip 1 MiB",
      "unit": "MiB/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2030.7645644171405,
          "mad": 24.95778870034826
        },
        "omimalloc": {
          "median": 2003.252944315337,
          "mad": 14.469297161178247
        },
        "clang23": {
          "median": 2000.2787578424413,
          "mad": 14.753819307620233
        },
        "v8patch": {
          "median": 1988.252641715224,
          "mad": 27.921677617423484
        },
        "lto": {
          "median": 2041.6194783148787,
          "mad": 28.009349608905268
        },
        "march": {
          "median": 2064.7193889200316,
          "mad": 34.47362706957074
        },
        "pgo": {
          "median": 2084.8400503689345,
          "mad": 18.02102954003817
        },
        "pc": {
          "median": 2203.4658697891373,
          "mad": 33.44596233810512
        }
      }
    },
    {
      "name": "JSON.parse 0.5 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 924.4965790563581,
          "mad": 3.671508710357614
        },
        "omimalloc": {
          "median": 919.0583250291268,
          "mad": 1.395975658174848
        },
        "clang23": {
          "median": 908.4926102005611,
          "mad": 8.164337373344267
        },
        "v8patch": {
          "median": 915.2716398664755,
          "mad": 7.261623109105187
        },
        "lto": {
          "median": 919.56809636813,
          "mad": 2.113871875230018
        },
        "march": {
          "median": 927.3962244645327,
          "mad": 2.2184362067057464
        },
        "pgo": {
          "median": 1052.463461047314,
          "mad": 4.326931748601623
        },
        "pc": {
          "median": 995.3548505444533,
          "mad": 5.452584162680012
        }
      }
    },
    {
      "name": "JSON.stringify 0.5 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2018.0685342081106,
          "mad": 3.7185988012204234
        },
        "omimalloc": {
          "median": 2014.4609127955828,
          "mad": 4.617426007854306
        },
        "clang23": {
          "median": 1991.657131428638,
          "mad": 6.26871281609283
        },
        "v8patch": {
          "median": 2009.4769891022886,
          "mad": 0.8656128437771713
        },
        "lto": {
          "median": 1998.7851736751757,
          "mad": 2.7867198903995813
        },
        "march": {
          "median": 1961.1205270847017,
          "mad": 2.3350582183801407
        },
        "pgo": {
          "median": 2008.09899562191,
          "mad": 1.4307421390462878
        },
        "pc": {
          "median": 1928.0470954532752,
          "mad": 54.96490279161128
        }
      }
    },
    {
      "name": "JSON.stringify record value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 19.542736677701505,
          "mad": 0.24380899206379603
        },
        "omimalloc": {
          "median": 19.637509912783393,
          "mad": 0.08246793712956801
        },
        "clang23": {
          "median": 19.267977754651817,
          "mad": 0.09595446097154081
        },
        "v8patch": {
          "median": 19.807488089079108,
          "mad": 0.13034053517417554
        },
        "lto": {
          "median": 19.403231505161877,
          "mad": 0.007112757963913197
        },
        "march": {
          "median": 19.802744530610084,
          "mad": 0.07824140842179084
        },
        "pgo": {
          "median": 20.782636250977042,
          "mad": 0.2854572213930613
        },
        "pc": {
          "median": 17.526574235380465,
          "mad": 0.13035010001579117
        }
      }
    },
    {
      "name": "JSON.stringify general domain",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 5.380994841193303,
          "mad": 0.019000661072114067
        },
        "omimalloc": {
          "median": 5.763586629170805,
          "mad": 0.010403123003750014
        },
        "clang23": {
          "median": 5.669920167139034,
          "mad": 0.008182138556188878
        },
        "v8patch": {
          "median": 5.7124714720826795,
          "mad": 0.04653110816836703
        },
        "lto": {
          "median": 5.639989849738709,
          "mad": 0.04564091179001073
        },
        "march": {
          "median": 5.668442857955462,
          "mad": 0.01878237810822725
        },
        "pgo": {
          "median": 5.856892514110771,
          "mad": 0.021465287153464185
        },
        "pc": {
          "median": 5.650688679067321,
          "mad": 0.11948230473729637
        }
      }
    },
    {
      "name": "JSON.stringify RPC message",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 5.682366811127553,
          "mad": 0.0027003769964561997
        },
        "omimalloc": {
          "median": 6.109026527408314,
          "mad": 0.01318101635822222
        },
        "clang23": {
          "median": 5.963065329168067,
          "mad": 0.01695044156396852
        },
        "v8patch": {
          "median": 5.994721387195105,
          "mad": 0.017860582681533455
        },
        "lto": {
          "median": 5.924107264529707,
          "mad": 0.011935827505117125
        },
        "march": {
          "median": 6.002614042152301,
          "mad": 0.018731180145107107
        },
        "pgo": {
          "median": 6.306023616575748,
          "mad": 0.007052394421546371
        },
        "pc": {
          "median": 6.265723647733843,
          "mad": 0.0476589356146806
        }
      }
    },
    {
      "name": "JSON.stringify 512-value batch",
      "unit": "Kbatches/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 43.95109373682695,
          "mad": 1.0165256473196074
        },
        "omimalloc": {
          "median": 44.871926157888005,
          "mad": 0.06662056470182165
        },
        "clang23": {
          "median": 43.85880723545321,
          "mad": 0.35665908989474815
        },
        "v8patch": {
          "median": 44.38227984385722,
          "mad": 0.12085761926279659
        },
        "lto": {
          "median": 43.82237307763228,
          "mad": 0.0009392981498876907
        },
        "march": {
          "median": 43.97481949407434,
          "mad": 0.1928759738773067
        },
        "pgo": {
          "median": 47.54533552496792,
          "mad": 0.16978349281855643
        },
        "pc": {
          "median": 39.8891666784573,
          "mad": 0.0464182733184586
        }
      }
    },
    {
      "name": "JSON.parse record value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 9.018290214471676,
          "mad": 0.06954653449408266
        },
        "omimalloc": {
          "median": 9.166183116655947,
          "mad": 0.049827435224576
        },
        "clang23": {
          "median": 9.31227623228413,
          "mad": 0.03300168340651055
        },
        "v8patch": {
          "median": 9.306919921973785,
          "mad": 0.02475466379288349
        },
        "lto": {
          "median": 9.318276943092158,
          "mad": 0.006496809140683624
        },
        "march": {
          "median": 8.884974740848662,
          "mad": 0.031110623572008222
        },
        "pgo": {
          "median": 11.264268830766795,
          "mad": 0.07607992571031907
        },
        "pc": {
          "median": 10.950341524117722,
          "mad": 0.11301945322835216
        }
      }
    },
    {
      "name": "JSON.parse general domain",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2.621309132507169,
          "mad": 0.007326026022918208
        },
        "omimalloc": {
          "median": 2.580093806330722,
          "mad": 0.039591718507720586
        },
        "clang23": {
          "median": 2.6225296618484935,
          "mad": 0.018958723668409005
        },
        "v8patch": {
          "median": 2.610493309287732,
          "mad": 0.011557223918702064
        },
        "lto": {
          "median": 2.598952011762357,
          "mad": 0.037142233853725504
        },
        "march": {
          "median": 2.6032218387241164,
          "mad": 0.003651801357070328
        },
        "pgo": {
          "median": 3.422583250050192,
          "mad": 0.023551402704582003
        },
        "pc": {
          "median": 3.3806473553259577,
          "mad": 0.011400864430496593
        }
      }
    },
    {
      "name": "JSON.parse RPC message",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 2.8908473518041955,
          "mad": 0.043934203277200545
        },
        "omimalloc": {
          "median": 2.9282627453055143,
          "mad": 0.015483068187982285
        },
        "clang23": {
          "median": 2.9681915672731822,
          "mad": 0.021351689988098554
        },
        "v8patch": {
          "median": 2.9200669834657798,
          "mad": 0.06500370375977194
        },
        "lto": {
          "median": 2.9743948449349764,
          "mad": 0.016087579098899907
        },
        "march": {
          "median": 2.85543506426455,
          "mad": 0.006155998438768906
        },
        "pgo": {
          "median": 4.224147543160553,
          "mad": 0.038777967748689246
        },
        "pc": {
          "median": 4.143011020924927,
          "mad": 0.011505371435701406
        }
      }
    },
    {
      "name": "JSON.parse primitives 1 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 960.2607583345759,
          "mad": 1.013510900181302
        },
        "omimalloc": {
          "median": 957.1323741510957,
          "mad": 1.3716364983502558
        },
        "clang23": {
          "median": 982.771654978664,
          "mad": 2.0708955078901
        },
        "v8patch": {
          "median": 977.6686996003634,
          "mad": 2.27589773188663
        },
        "lto": {
          "median": 994.899785327889,
          "mad": 1.807181840368571
        },
        "march": {
          "median": 998.3235999010135,
          "mad": 0.4671935236145828
        },
        "pgo": {
          "median": 984.0914329255025,
          "mad": 1.111126246990807
        },
        "pc": {
          "median": 1007.3950927267314,
          "mad": 1.418686904123092
        }
      }
    },
    {
      "name": "JSON.stringify primitives 1 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1268.4916329639561,
          "mad": 3.1232487501977175
        },
        "omimalloc": {
          "median": 1270.5520945001758,
          "mad": 1.3906459734369037
        },
        "clang23": {
          "median": 1247.7411582302352,
          "mad": 2.1191467265500705
        },
        "v8patch": {
          "median": 1234.744897756736,
          "mad": 1.339884573865561
        },
        "lto": {
          "median": 1233.0673609425303,
          "mad": 4.5588281359225675
        },
        "march": {
          "median": 1253.0209616812924,
          "mad": 1.9155312856496494
        },
        "pgo": {
          "median": 1425.665310360178,
          "mad": 1.8816066238500753
        },
        "pc": {
          "median": 1418.979059059977,
          "mad": 2.7902905388612
        }
      }
    },
    {
      "name": "JSON.parse escaped strings 1.8 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 523.0049589097712,
          "mad": 0.6826230519807837
        },
        "omimalloc": {
          "median": 523.118740644406,
          "mad": 1.5017747656247593
        },
        "clang23": {
          "median": 514.3637830890596,
          "mad": 1.128958322899166
        },
        "v8patch": {
          "median": 512.4538257137469,
          "mad": 3.712658638793471
        },
        "lto": {
          "median": 516.0936647903732,
          "mad": 1.1637351454527902
        },
        "march": {
          "median": 512.6877998860098,
          "mad": 0.44630434058416313
        },
        "pgo": {
          "median": 615.9882139486449,
          "mad": 4.357577339967463
        },
        "pc": {
          "median": 587.7494682036088,
          "mad": 7.398005863098433
        }
      }
    },
    {
      "name": "JSON.stringify escaped strings 1.8 MiB",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 468.61795747710096,
          "mad": 1.1842293172609857
        },
        "omimalloc": {
          "median": 752.486872023095,
          "mad": 1.8274835857772587
        },
        "clang23": {
          "median": 703.1136136777266,
          "mad": 0.5732384228787168
        },
        "v8patch": {
          "median": 729.7594010038325,
          "mad": 2.512112593691029
        },
        "lto": {
          "median": 718.8933862397789,
          "mad": 0.7252243380842174
        },
        "march": {
          "median": 740.5259918933659,
          "mad": 2.487335833090583
        },
        "pgo": {
          "median": 823.5620370298732,
          "mad": 2.6390096395199976
        },
        "pc": {
          "median": 564.7496383943396,
          "mad": 0.5661367714570815
        }
      }
    },
    {
      "name": "JSON.parse GeoJSON holdout",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 231.02450704808513,
          "mad": 1.5980098760643813
        },
        "omimalloc": {
          "median": 229.61778585903826,
          "mad": 1.0451497758038641
        },
        "clang23": {
          "median": 242.0986641437765,
          "mad": 0.03777311171913311
        },
        "v8patch": {
          "median": 242.9713750647972,
          "mad": 1.5303379072017265
        },
        "lto": {
          "median": 245.74001686811073,
          "mad": 0.486104076931241
        },
        "march": {
          "median": 235.56153609683165,
          "mad": 0.7748046885441511
        },
        "pgo": {
          "median": 290.304406826304,
          "mad": 0.2437264644066488
        },
        "pc": {
          "median": 317.35591671292576,
          "mad": 0.9076695069664424
        }
      }
    },
    {
      "name": "JSON.stringify GeoJSON holdout",
      "unit": "ops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 302.17488115620387,
          "mad": 1.4717053756741052
        },
        "omimalloc": {
          "median": 406.66212920286915,
          "mad": 0.7376708882411833
        },
        "clang23": {
          "median": 367.2767262384769,
          "mad": 1.0793682886727822
        },
        "v8patch": {
          "median": 396.53572421708975,
          "mad": 1.7815479087617234
        },
        "lto": {
          "median": 397.4367017477757,
          "mad": 0.66809679559492
        },
        "march": {
          "median": 398.96513136205914,
          "mad": 0.3318755804521345
        },
        "pgo": {
          "median": 444.6122646892684,
          "mad": 0.8570379324191322
        },
        "pc": {
          "median": 494.0280868253408,
          "mad": 3.3686777337201192
        }
      }
    },
    {
      "name": "HTTP/1.1 loopback, 64 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 48732.09901846819,
          "mad": 188.4925276869144
        },
        "omimalloc": {
          "median": 49651.10266978087,
          "mad": 163.94419067326453
        },
        "clang23": {
          "median": 50232.4059630078,
          "mad": 296.14072619625586
        },
        "v8patch": {
          "median": 49591.8733844042,
          "mad": 643.3495682090797
        },
        "lto": {
          "median": 51329.99242859335,
          "mad": 183.8114050117547
        },
        "march": {
          "median": 51884.21088099973,
          "mad": 675.5752451222143
        },
        "pgo": {
          "median": 60246.427852853594,
          "mad": 258.22649961271236
        },
        "pc": {
          "median": 62617.244609956586,
          "mad": 171.25176798612665
        }
      }
    },
    {
      "name": "HTTP/1.1 POST 4 KiB loopback, 64 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 41429.988582189384,
          "mad": 242.76193871713622
        },
        "omimalloc": {
          "median": 43563.76436448205,
          "mad": 627.0405959208329
        },
        "clang23": {
          "median": 44468.40003060059,
          "mad": 938.012022781797
        },
        "v8patch": {
          "median": 44677.63255340155,
          "mad": 588.1209014997658
        },
        "lto": {
          "median": 46929.389166143104,
          "mad": 544.3300721248343
        },
        "march": {
          "median": 44851.36853444432,
          "mad": 640.9265402918936
        },
        "pgo": {
          "median": 48424.54292744446,
          "mad": 1314.7861469146374
        },
        "pc": {
          "median": 52867.266982100205,
          "mad": 420.5448774309589
        }
      }
    },
    {
      "name": "HTTP/1.1 POST 64 KiB holdout, 16 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 16223.297463753393,
          "mad": 95.03486349033847
        },
        "omimalloc": {
          "median": 16556.002933106014,
          "mad": 110.20133129758324
        },
        "clang23": {
          "median": 16706.308493706285,
          "mad": 172.04034502148534
        },
        "v8patch": {
          "median": 17141.761285336364,
          "mad": 83.9169832768439
        },
        "lto": {
          "median": 16951.18255873562,
          "mad": 125.87613088281432
        },
        "march": {
          "median": 16910.64768043123,
          "mad": 167.20323323129378
        },
        "pgo": {
          "median": 18237.11407387419,
          "mad": 358.05127878118765
        },
        "pc": {
          "median": 20613.514983213878,
          "mad": 145.03471798068313
        }
      }
    },
    {
      "name": "HTTP/1.1 GET 4 KiB, 4 Workers on one reusePort socket, 64 connections",
      "unit": "req/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 68870.57537494283,
          "mad": 371.4720228079459
        },
        "omimalloc": {
          "median": 69689.5211697992,
          "mad": 394.22838845668593
        },
        "clang23": {
          "median": 70208.36506989691,
          "mad": 436.5317643706294
        },
        "v8patch": {
          "median": 70173.77572586681,
          "mad": 160.64129445812432
        },
        "lto": {
          "median": 72138.607006409,
          "mad": 1002.9468934810211
        },
        "march": {
          "median": 70501.52474015366,
          "mad": 1222.3475411379477
        },
        "pgo": {
          "median": 80343.71371598048,
          "mad": 870.1883073260542
        },
        "pc": {
          "median": 86468.01065991921,
          "mad": 696.2223303556675
        }
      }
    },
    {
      "name": "Process startup",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 11.29402300000001,
          "mad": 0.0771952500000026
        },
        "omimalloc": {
          "median": 11.54114174999998,
          "mad": 0.1422752499999973
        },
        "clang23": {
          "median": 12.409307500000011,
          "mad": 0.22126625000000644
        },
        "v8patch": {
          "median": 12.252217000000002,
          "mad": 0.10397275000002537
        },
        "lto": {
          "median": 11.924395250000032,
          "mad": 0.07552574999997574
        },
        "march": {
          "median": 11.738977000000006,
          "mad": 0.0761477499999863
        },
        "pgo": {
          "median": 11.00123125000001,
          "mad": 0.07411749999998563
        },
        "pc": {
          "median": 10.497719000000004,
          "mad": 0.07888250000000596
        }
      }
    },
    {
      "name": "RSS after 512 MiB Buffer churn",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 62.466796875,
          "mad": 0.013671875
        },
        "omimalloc": {
          "median": 579.15234375,
          "mad": 0.037109375
        },
        "clang23": {
          "median": 581.33203125,
          "mad": 0.0625
        },
        "v8patch": {
          "median": 580.8984375,
          "mad": 0.0546875
        },
        "lto": {
          "median": 582.32421875,
          "mad": 0.16796875
        },
        "march": {
          "median": 583.474609375,
          "mad": 0.091796875
        },
        "pgo": {
          "median": 572.236328125,
          "mad": 0.11328125
        },
        "pc": {
          "median": 568.837890625,
          "mad": 0.314453125
        }
      }
    },
    {
      "name": "RSS retained above baseline",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 0,
          "mad": 0
        },
        "omimalloc": {
          "median": 513.5,
          "mad": 0
        },
        "clang23": {
          "median": 513.5,
          "mad": 0
        },
        "v8patch": {
          "median": 513.25,
          "mad": 0.25
        },
        "lto": {
          "median": 513.53515625,
          "mad": 0.02734375
        },
        "march": {
          "median": 513.251953125,
          "mad": 0.251953125
        },
        "pgo": {
          "median": 513.5,
          "mad": 0
        },
        "pc": {
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
          "median": 512.75,
          "mad": 0.25
        },
        "clang23": {
          "median": 513,
          "mad": 0
        },
        "v8patch": {
          "median": 513,
          "mad": 0
        },
        "lto": {
          "median": 513,
          "mad": 0
        },
        "march": {
          "median": 513,
          "mad": 0
        },
        "pgo": {
          "median": 513.25,
          "mad": 0.25
        },
        "pc": {
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
          "median": 13.490404836640629,
          "mad": 0.09447657705140777
        },
        "omimalloc": {
          "median": 13.915931421575106,
          "mad": 0.0449879910718618
        },
        "clang23": {
          "median": 14.123331824248872,
          "mad": 0.11311044412760829
        },
        "v8patch": {
          "median": 14.425842544436808,
          "mad": 0.059189007911300884
        },
        "lto": {
          "median": 14.208890218846424,
          "mad": 0.27917332962882924
        },
        "march": {
          "median": 13.934446490506403,
          "mad": 0.0485991311431242
        },
        "pgo": {
          "median": 15.580752486848663,
          "mad": 0.17034212350780997
        },
        "pc": {
          "median": 35.82002488296219,
          "mad": 0.13046972141923874
        }
      }
    },
    {
      "name": "RSS for 2M-object graph",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 192.392578125,
          "mad": 4.46484375
        },
        "omimalloc": {
          "median": 182.75,
          "mad": 1.75
        },
        "clang23": {
          "median": 183.75,
          "mad": 0.25
        },
        "v8patch": {
          "median": 180,
          "mad": 1
        },
        "lto": {
          "median": 181.75,
          "mad": 2.5
        },
        "march": {
          "median": 183.5,
          "mad": 1.5
        },
        "pgo": {
          "median": 181.75,
          "mad": 3.25
        },
        "pc": {
          "median": 71.75,
          "mad": 0.25
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
        "clang23": {
          "median": 122.07245635986328,
          "mad": 0
        },
        "v8patch": {
          "median": 122.06965637207031,
          "mad": 0.00279998779296875
        },
        "lto": {
          "median": 122.07245635986328,
          "mad": 0
        },
        "march": {
          "median": 122.06685638427734,
          "mad": 0
        },
        "pgo": {
          "median": 122.06734848022461,
          "mad": 0.000492095947265625
        },
        "pc": {
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
          "median": 58.23523623589192,
          "mad": 0.9150060891545166
        },
        "omimalloc": {
          "median": 57.748837591928094,
          "mad": 1.004794930435839
        },
        "clang23": {
          "median": 55.59314229341395,
          "mad": 0.5578762339919727
        },
        "v8patch": {
          "median": 56.31380521637109,
          "mad": 0.4918209087574965
        },
        "lto": {
          "median": 58.008703804310215,
          "mad": 1.4187132334398775
        },
        "march": {
          "median": 60.293145455944085,
          "mad": 1.6107195181830605
        },
        "pgo": {
          "median": 64.01502895784087,
          "mad": 1.0089978228235204
        },
        "pc": {
          "median": 107.99571805138545,
          "mad": 0.9681744854910406
        }
      }
    },
    {
      "name": "Scavenge pause p50",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 1.8406009674072266,
          "mad": 0.08366584777832031
        },
        "omimalloc": {
          "median": 1.8998336791992188,
          "mad": 0.04467487335205078
        },
        "clang23": {
          "median": 2.119516372680664,
          "mad": 0.008423805236816406
        },
        "v8patch": {
          "median": 2.0375051498413086,
          "mad": 0.0469207763671875
        },
        "lto": {
          "median": 1.9002790451049805,
          "mad": 0.13539505004882812
        },
        "march": {
          "median": 1.7607669830322266,
          "mad": 0.06317996978759766
        },
        "pgo": {
          "median": 1.5916776657104492,
          "mad": 0.03403472900390625
        },
        "pc": {
          "median": 1.4012508392333984,
          "mad": 0.0050754547119140625
        }
      }
    },
    {
      "name": "Scavenge pause p99",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 2.8677730560302734,
          "mad": 0.12586593627929688
        },
        "omimalloc": {
          "median": 2.989274024963379,
          "mad": 0.18636035919189453
        },
        "clang23": {
          "median": 3.331881523132324,
          "mad": 0.3451862335205078
        },
        "v8patch": {
          "median": 2.9190988540649414,
          "mad": 0.09094619750976562
        },
        "lto": {
          "median": 2.8120718002319336,
          "mad": 0.08509349822998047
        },
        "march": {
          "median": 2.697683334350586,
          "mad": 0.11003494262695312
        },
        "pgo": {
          "median": 2.1761341094970703,
          "mad": 0.09527873992919922
        },
        "pc": {
          "median": 1.7230262756347656,
          "mad": 0.04524421691894531
        }
      }
    },
    {
      "name": "Scavenge pause max",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 4.243254661560059,
          "mad": 0.3735475540161133
        },
        "omimalloc": {
          "median": 4.1473846435546875,
          "mad": 0.31243133544921875
        },
        "clang23": {
          "median": 4.515148162841797,
          "mad": 0.053005218505859375
        },
        "v8patch": {
          "median": 4.347484588623047,
          "mad": 0.31871891021728516
        },
        "lto": {
          "median": 4.533685684204102,
          "mad": 0.23352622985839844
        },
        "march": {
          "median": 3.9960575103759766,
          "mad": 0.27690696716308594
        },
        "pgo": {
          "median": 2.4443912506103516,
          "mad": 0.07483673095703125
        },
        "pc": {
          "median": 1.7552270889282227,
          "mad": 0.026540756225585938
        }
      }
    },
    {
      "name": "Major GCs observed",
      "unit": "collections",
      "better": "lower",
      "values": {
        "official": {
          "median": 4.5,
          "mad": 0.5
        },
        "omimalloc": {
          "median": 5,
          "mad": 0
        },
        "clang23": {
          "median": 4.5,
          "mad": 0.5
        },
        "v8patch": {
          "median": 4,
          "mad": 0
        },
        "lto": {
          "median": 5,
          "mad": 0
        },
        "march": {
          "median": 4,
          "mad": 0
        },
        "pgo": {
          "median": 4.5,
          "mad": 0.5
        },
        "pc": {
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
          "median": 6.075329780578613,
          "mad": 0.3938026428222656
        },
        "omimalloc": {
          "median": 6.263785362243652,
          "mad": 0.2602405548095703
        },
        "clang23": {
          "median": 6.406311988830566,
          "mad": 0.21591567993164062
        },
        "v8patch": {
          "median": 6.125975608825684,
          "mad": 0.1668987274169922
        },
        "lto": {
          "median": 6.368494033813477,
          "mad": 0.04094123840332031
        },
        "march": {
          "median": 6.123888969421387,
          "mad": 0.23207855224609375
        },
        "pgo": {
          "median": 5.525317192077637,
          "mad": 0.12630081176757812
        },
        "pc": {
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
          "median": 58.987404602536735,
          "mad": 0.4358525419650334
        },
        "omimalloc": {
          "median": 59.521424034840365,
          "mad": 0.7720170321294049
        },
        "clang23": {
          "median": 60.83134202346314,
          "mad": 0.3664049870802657
        },
        "v8patch": {
          "median": 60.263032755247934,
          "mad": 0.7645484264539384
        },
        "lto": {
          "median": 59.10965275352653,
          "mad": 1.0726333715128682
        },
        "march": {
          "median": 57.98425321028681,
          "mad": 0.9450126447128255
        },
        "pgo": {
          "median": 55.421971544451914,
          "mad": 0.5157801261055859
        },
        "pc": {
          "median": 36.33748503151661,
          "mad": 0.5542507110456008
        }
      }
    },
    {
      "name": "Event loop delay p50 under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 0.997119,
          "mad": 0.0023039999999999727
        },
        "omimalloc": {
          "median": 0.998911,
          "mad": 0.005375999999999992
        },
        "clang23": {
          "median": 1.001471,
          "mad": 0.0038399999999999546
        },
        "v8patch": {
          "median": 1.010175,
          "mad": 0.007424000000000097
        },
        "lto": {
          "median": 1.024767,
          "mad": 0.0015359999999999818
        },
        "march": {
          "median": 1.025791,
          "mad": 0.01049600000000006
        },
        "pgo": {
          "median": 1.005567,
          "mad": 0.0017920000000001268
        },
        "pc": {
          "median": 0.9791989999999999,
          "mad": 0.007935999999999999
        }
      }
    },
    {
      "name": "Event loop delay p99 under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 4.452351,
          "mad": 0.13516799999999973
        },
        "omimalloc": {
          "median": 5.072895,
          "mad": 0.3153920000000001
        },
        "clang23": {
          "median": 4.720639,
          "mad": 0.06553600000000026
        },
        "v8patch": {
          "median": 4.577279,
          "mad": 0.18227199999999977
        },
        "lto": {
          "median": 4.825087,
          "mad": 0.08191999999999977
        },
        "march": {
          "median": 4.446207,
          "mad": 0.13107200000000008
        },
        "pgo": {
          "median": 4.411391,
          "mad": 0.05734400000000006
        },
        "pc": {
          "median": 2.5057270000000003,
          "mad": 0.05017600000000022
        }
      }
    },
    {
      "name": "Event loop delay p99.9 under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 7.055358999999999,
          "mad": 0.41164800000000046
        },
        "omimalloc": {
          "median": 6.977535,
          "mad": 0.3604479999999999
        },
        "clang23": {
          "median": 7.159807000000001,
          "mad": 0.34611200000000064
        },
        "v8patch": {
          "median": 7.858175,
          "mad": 0.8663040000000004
        },
        "lto": {
          "median": 7.274495,
          "mad": 0.7311359999999998
        },
        "march": {
          "median": 6.940671,
          "mad": 0.48537600000000003
        },
        "pgo": {
          "median": 6.035455,
          "mad": 0.35430399999999995
        },
        "pc": {
          "median": 2.6941430000000004,
          "mad": 0.08192000000000021
        }
      }
    },
    {
      "name": "Event loop delay max under churn",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 8.288255,
          "mad": 1.3537280000000003
        },
        "omimalloc": {
          "median": 8.247295,
          "mad": 0.7352320000000008
        },
        "clang23": {
          "median": 9.093119,
          "mad": 0.8888320000000003
        },
        "v8patch": {
          "median": 10.231807,
          "mad": 1.4950400000000004
        },
        "lto": {
          "median": 9.535487,
          "mad": 2.183168
        },
        "march": {
          "median": 7.874559,
          "mad": 1.2574720000000004
        },
        "pgo": {
          "median": 6.3549430000000005,
          "mad": 0.5836800000000002
        },
        "pc": {
          "median": 2.8344310000000004,
          "mad": 0.0993280000000003
        }
      }
    },
    {
      "name": "Full GC pause, 1M live records",
      "unit": "ms",
      "better": "lower",
      "values": {
        "official": {
          "median": 58.7061144999999,
          "mad": 1.288025500000117
        },
        "omimalloc": {
          "median": 58.53277349999996,
          "mad": 0.6609720000000152
        },
        "clang23": {
          "median": 59.25698800000009,
          "mad": 0.2926804999999604
        },
        "v8patch": {
          "median": 59.55890850000003,
          "mad": 0.4368380000000798
        },
        "lto": {
          "median": 59.81506999999999,
          "mad": 0.15827100000001337
        },
        "march": {
          "median": 57.38284250000004,
          "mad": 0.5009870000000092
        },
        "pgo": {
          "median": 46.58098300000006,
          "mad": 0.27019300000006297
        },
        "pc": {
          "median": 46.38643150000007,
          "mad": 0.3887455000000273
        }
      }
    },
    {
      "name": "Live heap at full GC",
      "unit": "MiB",
      "better": "lower",
      "values": {
        "official": {
          "median": 114.79047393798828,
          "mad": 0.00389862060546875
        },
        "omimalloc": {
          "median": 114.78768539428711,
          "mad": 0.003612518310546875
        },
        "clang23": {
          "median": 114.77740859985352,
          "mad": 0.010478973388671875
        },
        "v8patch": {
          "median": 114.78829956054688,
          "mad": 0.001049041748046875
        },
        "lto": {
          "median": 114.78716278076172,
          "mad": 0.00037384033203125
        },
        "march": {
          "median": 114.79203796386719,
          "mad": 0.00438690185546875
        },
        "pgo": {
          "median": 114.78689193725586,
          "mad": 0.001953125
        },
        "pc": {
          "median": 58.8922061920166,
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
          "median": 18.614248694570676,
          "mad": 0.015436389860543187
        },
        "omimalloc": {
          "median": 18.56720220507545,
          "mad": 0.023072769294943285
        },
        "clang23": {
          "median": 18.56653977991243,
          "mad": 0.0037740146392302165
        },
        "v8patch": {
          "median": 18.470705331970475,
          "mad": 0.03188431141415826
        },
        "lto": {
          "median": 18.553529849476938,
          "mad": 0.03483632412119064
        },
        "march": {
          "median": 18.542352022826968,
          "mad": 0.09811241137596483
        },
        "pgo": {
          "median": 18.30483475684476,
          "mad": 0.06736806446726007
        },
        "pc": {
          "median": 17.21273091001816,
          "mad": 0.14541819126697852
        }
      }
    },
    {
      "name": "Deepstream parse general-domain update",
      "unit": "Mmsg/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 17.524755692319545,
          "mad": 0.07944420221010162
        },
        "omimalloc": {
          "median": 17.59123069621831,
          "mad": 0.061996384096902446
        },
        "clang23": {
          "median": 17.681854893867758,
          "mad": 0.015570328423509139
        },
        "v8patch": {
          "median": 17.49766062548383,
          "mad": 0.07925983140124515
        },
        "lto": {
          "median": 17.503892524965146,
          "mad": 0.12251283184496486
        },
        "march": {
          "median": 17.738594383755313,
          "mad": 0.03426837747175426
        },
        "pgo": {
          "median": 17.6108966721378,
          "mad": 0.04453952831529584
        },
        "pc": {
          "median": 16.6394766562091,
          "mad": 0.3916566974439313
        }
      }
    },
    {
      "name": "Deepstream split 8-message frame",
      "unit": "Kframes/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 1512.4399186607998,
          "mad": 15.056871315896274
        },
        "omimalloc": {
          "median": 1524.5969686196172,
          "mad": 2.0338379268873723
        },
        "clang23": {
          "median": 1545.5617699402128,
          "mad": 5.287435493286921
        },
        "v8patch": {
          "median": 1526.5766029572244,
          "mad": 11.10607723713656
        },
        "lto": {
          "median": 1548.565856853492,
          "mad": 0.4748100589454225
        },
        "march": {
          "median": 1539.27873045047,
          "mad": 7.09127265569316
        },
        "pgo": {
          "median": 1517.7722587876256,
          "mad": 6.733282790432895
        },
        "pc": {
          "median": 1449.719755645503,
          "mad": 9.559220331780239
        }
      }
    },
    {
      "name": "Deepstream build record update",
      "unit": "Mmsg/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 17.50263121894126,
          "mad": 0.16677609730101928
        },
        "omimalloc": {
          "median": 17.32885740237291,
          "mad": 0.07195662500095246
        },
        "clang23": {
          "median": 17.65206216910422,
          "mad": 0.016842977436018813
        },
        "v8patch": {
          "median": 17.60570717565775,
          "mad": 0.05562649936188713
        },
        "lto": {
          "median": 17.67859285167104,
          "mad": 0.04501915865520267
        },
        "march": {
          "median": 17.751728023157998,
          "mad": 0.10065205931282506
        },
        "pgo": {
          "median": 17.99776939209174,
          "mad": 0.017530089901024226
        },
        "pc": {
          "median": 16.679201153144835,
          "mad": 0.6119236166286353
        }
      }
    },
    {
      "name": "Deepstream part toString, 28 B name",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 22.76915875226598,
          "mad": 0.05628702508246164
        },
        "omimalloc": {
          "median": 22.800565258377844,
          "mad": 0.03294178767624345
        },
        "clang23": {
          "median": 23.8096829704251,
          "mad": 0.09655769029582473
        },
        "v8patch": {
          "median": 23.750632232433414,
          "mad": 0.05626777127415039
        },
        "lto": {
          "median": 23.54501439797997,
          "mad": 0.11559497980906919
        },
        "march": {
          "median": 23.81034446102972,
          "mad": 0.0921512419798649
        },
        "pgo": {
          "median": 24.555068771894675,
          "mad": 0.010781701463759674
        },
        "pc": {
          "median": 23.635901327072858,
          "mad": 0.20539835710596321
        }
      }
    },
    {
      "name": "Deepstream part toString, 190 B value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 20.258189818188114,
          "mad": 0.15097060309447485
        },
        "omimalloc": {
          "median": 20.482735694300327,
          "mad": 0.06256554206041365
        },
        "clang23": {
          "median": 21.257658387561477,
          "mad": 0.07751184002313671
        },
        "v8patch": {
          "median": 21.432788413396054,
          "mad": 0.06938081504019067
        },
        "lto": {
          "median": 21.70584773845373,
          "mad": 0.07228395753262618
        },
        "march": {
          "median": 21.49721768747576,
          "mad": 0.07965869349675536
        },
        "pgo": {
          "median": 22.271441952646846,
          "mad": 0.013326057708258787
        },
        "pc": {
          "median": 21.538724734384935,
          "mad": 0.269583490794453
        }
      }
    },
    {
      "name": "Deepstream part toBuffer",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 47.55678833742049,
          "mad": 0.4239151451152807
        },
        "omimalloc": {
          "median": 48.0846129326982,
          "mad": 0.16145783219426235
        },
        "clang23": {
          "median": 47.35065569649647,
          "mad": 0.423161749706086
        },
        "v8patch": {
          "median": 48.70201859641547,
          "mad": 0.28777907141726544
        },
        "lto": {
          "median": 48.5441812522664,
          "mad": 0.4015393983334903
        },
        "march": {
          "median": 47.93412577084331,
          "mad": 0.14430220419231787
        },
        "pgo": {
          "median": 48.60769108747166,
          "mad": 0.1378430937688293
        },
        "pc": {
          "median": 46.262853521289244,
          "mad": 0.24762006594833963
        }
      }
    },
    {
      "name": "Deepstream typed() record value",
      "unit": "Mops/s",
      "better": "higher",
      "values": {
        "official": {
          "median": 43.62650278410021,
          "mad": 0.07021262217955737
        },
        "omimalloc": {
          "median": 43.470189360587156,
          "mad": 0.12703801103850765
        },
        "clang23": {
          "median": 43.59218918222791,
          "mad": 0.10288437842941178
        },
        "v8patch": {
          "median": 43.74958628062922,
          "mad": 0.09379344107404464
        },
        "lto": {
          "median": 43.40395327879289,
          "mad": 0.08653861759118797
        },
        "march": {
          "median": 43.736449434919244,
          "mad": 0.06562765203825904
        },
        "pgo": {
          "median": 46.47245365579,
          "mad": 0.09506630846581032
        },
        "pc": {
          "median": 39.86400989337304,
          "mad": 0.10012704880808698
        }
      }
    }
  ]
}

| Benchmark | Unit | official | omimalloc | clang23 | v8patch | lto | march | pgo | pc | official→omimalloc | omimalloc→clang23 | clang23→v8patch | v8patch→lto | lto→march | march→pgo | pgo→pc | official→pc |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Buffer.copy 64 B | Mops/s | 62.73 ± 1.03 | 62.86 ± 0.37 | 63.18 ± 0.23 | 95.90 ± 0.22 | 97.75 ± 0.09 | 95.38 ± 0.05 | 133.5 ± 0.09 | 131.7 ± 0.23 | +0.2% | +0.5% | +51.8% | +1.9% | -2.4% | +40.0% | -1.4% | +109.9% |
| Buffer.copy 4 KiB | GiB/s | 118.4 ± 1.91 | 126.5 ± 1.52 | 126.2 ± 0.61 | 150.2 ± 3.21 | 149.5 ± 1.62 | 153.0 ± 3.35 | 166.9 ± 1.62 | 163.1 ± 0.88 | +6.9% | -0.3% | +19.0% | -0.5% | +2.3% | +9.1% | -2.3% | +37.7% |
| Buffer.copy 16 KiB holdout | GiB/s | 201.5 ± 0.53 | 206.6 ± 0.96 | 207.1 ± 0.28 | 222.8 ± 0.69 | 220.9 ± 0.67 | 223.4 ± 1.63 | 230.2 ± 0.40 | 228.8 ± 0.81 | +2.5% | +0.2% | +7.5% | -0.8% | +1.1% | +3.0% | -0.6% | +13.5% |
| Buffer.copy 128 KiB, storage chunk | GiB/s | 81.01 ± 0.14 | 83.38 ± 1.99 | 87.26 ± 0.66 | 80.16 ± 0.64 | 80.56 ± 0.89 | 74.12 ± 0.21 | 78.62 ± 1.51 | 77.12 ± 0.12 | +2.9% | +4.7% | -8.1% | +0.5% | -8.0% | +6.1% | -1.9% | -4.8% |
| Buffer.copy 1 MiB | GiB/s | 58.00 ± 0.15 | 58.04 ± 0.05 | 58.18 ± 0.10 | 58.35 ± 0.13 | 58.18 ± 0.18 | 58.19 ± 0.05 | 58.26 ± 0.12 | 58.08 ± 0.17 | +0.1% | +0.2% | +0.3% | -0.3% | +0.0% | +0.1% | -0.3% | +0.1% |
| Buffer.swap16 8 KiB holdout | GiB/s | 53.15 ± 0.65 | 51.73 ± 0.60 | 52.64 ± 1.33 | 51.10 ± 0.13 | 52.05 ± 0.51 | 139.0 ± 0.53 | 151.6 ± 0.52 | 142.4 ± 1.65 | -2.7% | +1.8% | -2.9% | +1.9% | +167.2% | +9.0% | -6.1% | +167.9% |
| Buffer frame encode/decode 256 B | Mops/s | 31.94 ± 0.11 | 30.95 ± 0.38 | 31.52 ± 0.17 | 46.95 ± 0.18 | 46.03 ± 0.73 | 47.15 ± 0.18 | 54.21 ± 0.58 | 48.01 ± 5.48 | -3.1% | +1.8% | +49.0% | -2.0% | +2.4% | +15.0% | -11.4% | +50.3% |
| Buffer.allocUnsafe 256 KiB chunk churn | Kops/s | 1,454 ± 21.04 | 2,088 ± 13.19 | 2,170 ± 14.64 | 2,185 ± 21.88 | 2,185 ± 45.25 | 2,148 ± 10.78 | 2,296 ± 4.08 | 2,315 ± 21.89 | +43.7% | +3.9% | +0.7% | +0.0% | -1.7% | +6.9% | +0.8% | +59.3% |
| Buffer.concat 2 × 256 B | Mops/s | 10.84 ± 0.14 | 10.94 ± 0.10 | 10.99 ± 0.06 | 11.00 ± 0.03 | 11.08 ± 0.03 | 11.09 ± 0.10 | 11.24 ± 0.04 | 10.82 ± 0.06 | +1.0% | +0.4% | +0.1% | +0.7% | +0.1% | +1.4% | -3.8% | -0.2% |
| SHA-256 1 MiB | GiB/s | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | 2.03 ± 0.00 | +0.0% | -0.0% | +0.0% | +0.0% | -0.0% | +0.0% | +0.1% | +0.2% |
| SHA-256 128 KiB, storage chunk | GiB/s | 1.99 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.00 ± 0.00 | 2.01 ± 0.00 | 2.01 ± 0.00 | +0.3% | +0.0% | +0.0% | +0.1% | +0.0% | +0.2% | -0.1% | +0.6% |
| gzip level 1, 1 MiB | MiB/s | 2,364 ± 6.25 | 2,367 ± 1.75 | 2,482 ± 4.14 | 2,482 ± 2.57 | 2,435 ± 0.52 | 2,443 ± 3.44 | 2,250 ± 2.97 | 2,261 ± 3.67 | +0.2% | +4.9% | +0.0% | -1.9% | +0.3% | -7.9% | +0.5% | -4.3% |
| gunzip 1 MiB | MiB/s | 2,031 ± 24.96 | 2,003 ± 14.47 | 2,000 ± 14.75 | 1,988 ± 27.92 | 2,042 ± 28.01 | 2,065 ± 34.47 | 2,085 ± 18.02 | 2,203 ± 33.45 | -1.4% | -0.1% | -0.6% | +2.7% | +1.1% | +1.0% | +5.7% | +8.5% |
| JSON.parse 0.5 MiB | ops/s | 924.5 ± 3.67 | 919.1 ± 1.40 | 908.5 ± 8.16 | 915.3 ± 7.26 | 919.6 ± 2.11 | 927.4 ± 2.22 | 1,052 ± 4.33 | 995.4 ± 5.45 | -0.6% | -1.1% | +0.7% | +0.5% | +0.9% | +13.5% | -5.4% | +7.7% |
| JSON.stringify 0.5 MiB | ops/s | 2,018 ± 3.72 | 2,014 ± 4.62 | 1,992 ± 6.27 | 2,009 ± 0.87 | 1,999 ± 2.79 | 1,961 ± 2.34 | 2,008 ± 1.43 | 1,928 ± 54.96 | -0.2% | -1.1% | +0.9% | -0.5% | -1.9% | +2.4% | -4.0% | -4.5% |
| JSON.stringify record value | Mops/s | 19.54 ± 0.24 | 19.64 ± 0.08 | 19.27 ± 0.10 | 19.81 ± 0.13 | 19.40 ± 0.01 | 19.80 ± 0.08 | 20.78 ± 0.29 | 17.53 ± 0.13 | +0.5% | -1.9% | +2.8% | -2.0% | +2.1% | +4.9% | -15.7% | -10.3% |
| JSON.stringify general domain | Mops/s | 5.38 ± 0.02 | 5.76 ± 0.01 | 5.67 ± 0.01 | 5.71 ± 0.05 | 5.64 ± 0.05 | 5.67 ± 0.02 | 5.86 ± 0.02 | 5.65 ± 0.12 | +7.1% | -1.6% | +0.8% | -1.3% | +0.5% | +3.3% | -3.5% | +5.0% |
| JSON.stringify RPC message | Mops/s | 5.68 ± 0.00 | 6.11 ± 0.01 | 5.96 ± 0.02 | 5.99 ± 0.02 | 5.92 ± 0.01 | 6.00 ± 0.02 | 6.31 ± 0.01 | 6.27 ± 0.05 | +7.5% | -2.4% | +0.5% | -1.2% | +1.3% | +5.1% | -0.6% | +10.3% |
| JSON.stringify 512-value batch | Kbatches/s | 43.95 ± 1.02 | 44.87 ± 0.07 | 43.86 ± 0.36 | 44.38 ± 0.12 | 43.82 ± 0.00 | 43.97 ± 0.19 | 47.55 ± 0.17 | 39.89 ± 0.05 | +2.1% | -2.3% | +1.2% | -1.3% | +0.3% | +8.1% | -16.1% | -9.2% |
| JSON.parse record value | Mops/s | 9.02 ± 0.07 | 9.17 ± 0.05 | 9.31 ± 0.03 | 9.31 ± 0.02 | 9.32 ± 0.01 | 8.88 ± 0.03 | 11.26 ± 0.08 | 10.95 ± 0.11 | +1.6% | +1.6% | -0.1% | +0.1% | -4.7% | +26.8% | -2.8% | +21.4% |
| JSON.parse general domain | Mops/s | 2.62 ± 0.01 | 2.58 ± 0.04 | 2.62 ± 0.02 | 2.61 ± 0.01 | 2.60 ± 0.04 | 2.60 ± 0.00 | 3.42 ± 0.02 | 3.38 ± 0.01 | -1.6% | +1.6% | -0.5% | -0.4% | +0.2% | +31.5% | -1.2% | +29.0% |
| JSON.parse RPC message | Mops/s | 2.89 ± 0.04 | 2.93 ± 0.02 | 2.97 ± 0.02 | 2.92 ± 0.07 | 2.97 ± 0.02 | 2.86 ± 0.01 | 4.22 ± 0.04 | 4.14 ± 0.01 | +1.3% | +1.4% | -1.6% | +1.9% | -4.0% | +47.9% | -1.9% | +43.3% |
| JSON.parse primitives 1 MiB | ops/s | 960.3 ± 1.01 | 957.1 ± 1.37 | 982.8 ± 2.07 | 977.7 ± 2.28 | 994.9 ± 1.81 | 998.3 ± 0.47 | 984.1 ± 1.11 | 1,007 ± 1.42 | -0.3% | +2.7% | -0.5% | +1.8% | +0.3% | -1.4% | +2.4% | +4.9% |
| JSON.stringify primitives 1 MiB | ops/s | 1,268 ± 3.12 | 1,271 ± 1.39 | 1,248 ± 2.12 | 1,235 ± 1.34 | 1,233 ± 4.56 | 1,253 ± 1.92 | 1,426 ± 1.88 | 1,419 ± 2.79 | +0.2% | -1.8% | -1.0% | -0.1% | +1.6% | +13.8% | -0.5% | +11.9% |
| JSON.parse escaped strings 1.8 MiB | ops/s | 523.0 ± 0.68 | 523.1 ± 1.50 | 514.4 ± 1.13 | 512.5 ± 3.71 | 516.1 ± 1.16 | 512.7 ± 0.45 | 616.0 ± 4.36 | 587.7 ± 7.40 | +0.0% | -1.7% | -0.4% | +0.7% | -0.7% | +20.1% | -4.6% | +12.4% |
| JSON.stringify escaped strings 1.8 MiB | ops/s | 468.6 ± 1.18 | 752.5 ± 1.83 | 703.1 ± 0.57 | 729.8 ± 2.51 | 718.9 ± 0.73 | 740.5 ± 2.49 | 823.6 ± 2.64 | 564.7 ± 0.57 | +60.6% | -6.6% | +3.8% | -1.5% | +3.0% | +11.2% | -31.4% | +20.5% |
| JSON.parse GeoJSON holdout | ops/s | 231.0 ± 1.60 | 229.6 ± 1.05 | 242.1 ± 0.04 | 243.0 ± 1.53 | 245.7 ± 0.49 | 235.6 ± 0.77 | 290.3 ± 0.24 | 317.4 ± 0.91 | -0.6% | +5.4% | +0.4% | +1.1% | -4.1% | +23.2% | +9.3% | +37.4% |
| JSON.stringify GeoJSON holdout | ops/s | 302.2 ± 1.47 | 406.7 ± 0.74 | 367.3 ± 1.08 | 396.5 ± 1.78 | 397.4 ± 0.67 | 399.0 ± 0.33 | 444.6 ± 0.86 | 494.0 ± 3.37 | +34.6% | -9.7% | +8.0% | +0.2% | +0.4% | +11.4% | +11.1% | +63.5% |
| HTTP/1.1 loopback, 64 connections | req/s | 48,732 ± 188.5 | 49,651 ± 163.9 | 50,232 ± 296.1 | 49,592 ± 643.3 | 51,330 ± 183.8 | 51,884 ± 675.6 | 60,246 ± 258.2 | 62,617 ± 171.3 | +1.9% | +1.2% | -1.3% | +3.5% | +1.1% | +16.1% | +3.9% | +28.5% |
| HTTP/1.1 POST 4 KiB loopback, 64 connections | req/s | 41,430 ± 242.8 | 43,564 ± 627.0 | 44,468 ± 938.0 | 44,678 ± 588.1 | 46,929 ± 544.3 | 44,851 ± 640.9 | 48,425 ± 1,315 | 52,867 ± 420.5 | +5.2% | +2.1% | +0.5% | +5.0% | -4.4% | +8.0% | +9.2% | +27.6% |
| HTTP/1.1 POST 64 KiB holdout, 16 connections | req/s | 16,223 ± 95.03 | 16,556 ± 110.2 | 16,706 ± 172.0 | 17,142 ± 83.92 | 16,951 ± 125.9 | 16,911 ± 167.2 | 18,237 ± 358.1 | 20,614 ± 145.0 | +2.1% | +0.9% | +2.6% | -1.1% | -0.2% | +7.8% | +13.0% | +27.1% |
| HTTP/1.1 GET 4 KiB, 4 Workers on one reusePort socket, 64 connections | req/s | 68,871 ± 371.5 | 69,690 ± 394.2 | 70,208 ± 436.5 | 70,174 ± 160.6 | 72,139 ± 1,003 | 70,502 ± 1,222 | 80,344 ± 870.2 | 86,468 ± 696.2 | +1.2% | +0.7% | -0.0% | +2.8% | -2.3% | +14.0% | +7.6% | +25.6% |
| Process startup | ms | 11.29 ± 0.08 | 11.54 ± 0.14 | 12.41 ± 0.22 | 12.25 ± 0.10 | 11.92 ± 0.08 | 11.74 ± 0.08 | 11.00 ± 0.07 | 10.50 ± 0.08 | -2.2% | -7.5% | +1.3% | +2.7% | +1.6% | +6.3% | +4.6% | +7.1% |
| RSS after 512 MiB Buffer churn | MiB | 62.47 ± 0.01 | 579.2 ± 0.04 | 581.3 ± 0.06 | 580.9 ± 0.05 | 582.3 ± 0.17 | 583.5 ± 0.09 | 572.2 ± 0.11 | 568.8 ± 0.31 | -827.1% | -0.4% | +0.1% | -0.2% | -0.2% | +1.9% | +0.6% | -810.6% |
| RSS retained above baseline | MiB | 0.00 ± 0.00 | 513.5 ± 0.00 | 513.5 ± 0.00 | 513.3 ± 0.25 | 513.5 ± 0.03 | 513.3 ± 0.25 | 513.5 ± 0.00 | 514.0 ± 0.00 | n/a | +0.0% | +0.0% | -0.1% | +0.1% | -0.0% | -0.1% | n/a |
| Committed RSS at churn peak | MiB | 513.5 ± 0.00 | 512.8 ± 0.25 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.0 ± 0.00 | 513.3 ± 0.25 | 514.0 ± 0.00 | +0.1% | -0.0% | +0.0% | +0.0% | +0.0% | -0.0% | -0.1% | -0.1% |
| Allocate 2M-object graph | Mobjects/s | 13.49 ± 0.09 | 13.92 ± 0.04 | 14.12 ± 0.11 | 14.43 ± 0.06 | 14.21 ± 0.28 | 13.93 ± 0.05 | 15.58 ± 0.17 | 35.82 ± 0.13 | +3.2% | +1.5% | +2.1% | -1.5% | -1.9% | +11.8% | +129.9% | +165.5% |
| RSS for 2M-object graph | MiB | 192.4 ± 4.46 | 182.8 ± 1.75 | 183.8 ± 0.25 | 180.0 ± 1.00 | 181.8 ± 2.50 | 183.5 ± 1.50 | 181.8 ± 3.25 | 71.75 ± 0.25 | +5.0% | -0.5% | +2.0% | -1.0% | -1.0% | +1.0% | +60.5% | +62.7% |
| V8 heap for 2M-object graph | MiB | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 122.1 ± 0.00 | 61.04 ± 0.00 | +0.0% | +0.0% | +0.0% | -0.0% | +0.0% | -0.0% | +50.0% | +50.0% |
| Record churn under GC | Mrecords/s | 58.24 ± 0.92 | 57.75 ± 1.00 | 55.59 ± 0.56 | 56.31 ± 0.49 | 58.01 ± 1.42 | 60.29 ± 1.61 | 64.02 ± 1.01 | 108.0 ± 0.97 | -0.8% | -3.7% | +1.3% | +3.0% | +3.9% | +6.2% | +68.7% | +85.4% |
| Scavenge pause p50 | ms | 1.84 ± 0.08 | 1.90 ± 0.04 | 2.12 ± 0.01 | 2.04 ± 0.05 | 1.90 ± 0.14 | 1.76 ± 0.06 | 1.59 ± 0.03 | 1.40 ± 0.01 | -3.2% | -11.6% | +3.9% | +6.7% | +7.3% | +9.6% | +12.0% | +23.9% |
| Scavenge pause p99 | ms | 2.87 ± 0.13 | 2.99 ± 0.19 | 3.33 ± 0.35 | 2.92 ± 0.09 | 2.81 ± 0.09 | 2.70 ± 0.11 | 2.18 ± 0.10 | 1.72 ± 0.05 | -4.2% | -11.5% | +12.4% | +3.7% | +4.1% | +19.3% | +20.8% | +39.9% |
| Scavenge pause max | ms | 4.24 ± 0.37 | 4.15 ± 0.31 | 4.52 ± 0.05 | 4.35 ± 0.32 | 4.53 ± 0.23 | 4.00 ± 0.28 | 2.44 ± 0.07 | 1.76 ± 0.03 | +2.3% | -8.9% | +3.7% | -4.3% | +11.9% | +38.8% | +28.2% | +58.6% |
| Major GCs observed | collections | 4.50 ± 0.50 | 5.00 ± 0.00 | 4.50 ± 0.50 | 4.00 ± 0.00 | 5.00 ± 0.00 | 4.00 ± 0.00 | 4.50 ± 0.50 | 0.00 ± 0.00 | -11.1% | +10.0% | +11.1% | -25.0% | +20.0% | -12.5% | n/a | n/a |
| Major GC pause max, observed | ms | 6.08 ± 0.39 | 6.26 ± 0.26 | 6.41 ± 0.22 | 6.13 ± 0.17 | 6.37 ± 0.04 | 6.12 ± 0.23 | 5.53 ± 0.13 | 0.00 ± 0.00 | -3.1% | -2.3% | +4.4% | -4.0% | +3.8% | +9.8% | n/a | n/a |
| GC time share | % of wall clock | 58.99 ± 0.44 | 59.52 ± 0.77 | 60.83 ± 0.37 | 60.26 ± 0.76 | 59.11 ± 1.07 | 57.98 ± 0.95 | 55.42 ± 0.52 | 36.34 ± 0.55 | -0.9% | -2.2% | +0.9% | +1.9% | +1.9% | +4.4% | +34.4% | +38.4% |
| Event loop delay p50 under churn | ms | 1.00 ± 0.00 | 1.00 ± 0.01 | 1.00 ± 0.00 | 1.01 ± 0.01 | 1.02 ± 0.00 | 1.03 ± 0.01 | 1.01 ± 0.00 | 0.98 ± 0.01 | -0.2% | -0.3% | -0.9% | -1.4% | -0.1% | +2.0% | +2.6% | +1.8% |
| Event loop delay p99 under churn | ms | 4.45 ± 0.14 | 5.07 ± 0.32 | 4.72 ± 0.07 | 4.58 ± 0.18 | 4.83 ± 0.08 | 4.45 ± 0.13 | 4.41 ± 0.06 | 2.51 ± 0.05 | -13.9% | +6.9% | +3.0% | -5.4% | +7.9% | +0.8% | +43.2% | +43.7% |
| Event loop delay p99.9 under churn | ms | 7.06 ± 0.41 | 6.98 ± 0.36 | 7.16 ± 0.35 | 7.86 ± 0.87 | 7.27 ± 0.73 | 6.94 ± 0.49 | 6.04 ± 0.35 | 2.69 ± 0.08 | +1.1% | -2.6% | -9.8% | +7.4% | +4.6% | +13.0% | +55.4% | +61.8% |
| Event loop delay max under churn | ms | 8.29 ± 1.35 | 8.25 ± 0.74 | 9.09 ± 0.89 | 10.23 ± 1.50 | 9.54 ± 2.18 | 7.87 ± 1.26 | 6.35 ± 0.58 | 2.83 ± 0.10 | +0.5% | -10.3% | -12.5% | +6.8% | +17.4% | +19.3% | +55.4% | +65.8% |
| Full GC pause, 1M live records | ms | 58.71 ± 1.29 | 58.53 ± 0.66 | 59.26 ± 0.29 | 59.56 ± 0.44 | 59.82 ± 0.16 | 57.38 ± 0.50 | 46.58 ± 0.27 | 46.39 ± 0.39 | +0.3% | -1.2% | -0.5% | -0.4% | +4.1% | +18.8% | +0.4% | +21.0% |
| Live heap at full GC | MiB | 114.8 ± 0.00 | 114.8 ± 0.00 | 114.8 ± 0.01 | 114.8 ± 0.00 | 114.8 ± 0.00 | 114.8 ± 0.00 | 114.8 ± 0.00 | 58.89 ± 0.00 | +0.0% | +0.0% | -0.0% | +0.0% | -0.0% | +0.0% | +48.7% | +48.7% |
| Deepstream parse record update | Mmsg/s | 18.61 ± 0.02 | 18.57 ± 0.02 | 18.57 ± 0.00 | 18.47 ± 0.03 | 18.55 ± 0.03 | 18.54 ± 0.10 | 18.30 ± 0.07 | 17.21 ± 0.15 | -0.3% | -0.0% | -0.5% | +0.4% | -0.1% | -1.3% | -6.0% | -7.5% |
| Deepstream parse general-domain update | Mmsg/s | 17.52 ± 0.08 | 17.59 ± 0.06 | 17.68 ± 0.02 | 17.50 ± 0.08 | 17.50 ± 0.12 | 17.74 ± 0.03 | 17.61 ± 0.04 | 16.64 ± 0.39 | +0.4% | +0.5% | -1.0% | +0.0% | +1.3% | -0.7% | -5.5% | -5.1% |
| Deepstream split 8-message frame | Kframes/s | 1,512 ± 15.06 | 1,525 ± 2.03 | 1,546 ± 5.29 | 1,527 ± 11.11 | 1,549 ± 0.47 | 1,539 ± 7.09 | 1,518 ± 6.73 | 1,450 ± 9.56 | +0.8% | +1.4% | -1.2% | +1.4% | -0.6% | -1.4% | -4.5% | -4.1% |
| Deepstream build record update | Mmsg/s | 17.50 ± 0.17 | 17.33 ± 0.07 | 17.65 ± 0.02 | 17.61 ± 0.06 | 17.68 ± 0.05 | 17.75 ± 0.10 | 18.00 ± 0.02 | 16.68 ± 0.61 | -1.0% | +1.9% | -0.3% | +0.4% | +0.4% | +1.4% | -7.3% | -4.7% |
| Deepstream part toString, 28 B name | Mops/s | 22.77 ± 0.06 | 22.80 ± 0.03 | 23.81 ± 0.10 | 23.75 ± 0.06 | 23.55 ± 0.12 | 23.81 ± 0.09 | 24.56 ± 0.01 | 23.64 ± 0.21 | +0.1% | +4.4% | -0.2% | -0.9% | +1.1% | +3.1% | -3.7% | +3.8% |
| Deepstream part toString, 190 B value | Mops/s | 20.26 ± 0.15 | 20.48 ± 0.06 | 21.26 ± 0.08 | 21.43 ± 0.07 | 21.71 ± 0.07 | 21.50 ± 0.08 | 22.27 ± 0.01 | 21.54 ± 0.27 | +1.1% | +3.8% | +0.8% | +1.3% | -1.0% | +3.6% | -3.3% | +6.3% |
| Deepstream part toBuffer | Mops/s | 47.56 ± 0.42 | 48.08 ± 0.16 | 47.35 ± 0.42 | 48.70 ± 0.29 | 48.54 ± 0.40 | 47.93 ± 0.14 | 48.61 ± 0.14 | 46.26 ± 0.25 | +1.1% | -1.5% | +2.9% | -0.3% | -1.3% | +1.4% | -4.8% | -2.7% |
| Deepstream typed() record value | Mops/s | 43.63 ± 0.07 | 43.47 ± 0.13 | 43.59 ± 0.10 | 43.75 ± 0.09 | 43.40 ± 0.09 | 43.74 ± 0.07 | 46.47 ± 0.10 | 39.86 ± 0.10 | -0.4% | +0.3% | +0.4% | -0.8% | +0.8% | +6.3% | -14.2% | -8.6% |
