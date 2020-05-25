const nodeUrl = 'https://tnnode2.turtlenetwork.eu';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://data-service.turtlenetwork.eu/v0',
    dataFeedBaseUrl: 'https://api.marketdata.turtlenetwork.eu',
    spamListUrl: 'https://raw.githubusercontent.com/BlackTurtle123/TN-community/master/scam-v2.csv',
    nodes: [
        {url: 'https://privatenode.blackturtle.eu',maintainer: 'https://t.me/blackturtle'},
        {url: nodeUrl,maintainer: 'https://t.me/blackturtle'},
        {url: 'https://ninjastar.ninjaturtle.co.za',maintainer: 'https://twitter.com/gordobsa'},
        {url: 'https://node.maplenode.net',maintainer: 'MapleNode'},
        {url: 'https://giznode.thegremlins.net',maintainer: 'G1zm0'},
        {url: 'https://node.mortysnode.nl', maintainer: 'Morty'}
        //{url: 'https://www.globalmarketsource.com',maintainer: '@FriGo_Bar'}
        ],
    gateways: [
        // Team gateways
        {name: '$TN',url: 'https://tngw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$LTC',url: 'https://ltcgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$BTC',url: 'https://btcgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$WAVES',url: 'https://wavesgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$DASH',url: 'https://dashgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$WGR',url: 'https://wgrgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$SYS',url: 'https://sysgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$BCH',url: 'https://bchgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$DOGE',url: 'https://dogegw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$ETH',url: 'https://ethgw.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        //Partner gateways
        {name: '$TUSD', url: 'https://tusdgw.rcanelabs.com', maintainer:'https://www.rcanelabs.com'},
        {name: '$SENT', url: 'https://sentgw.rcanelabs.com', maintainer:'https://www.rcanelabs.com'},
        {name: '$ARRR', url: 'https://arrrgw.rcanelabs.com', maintainer:'https://www.rcanelabs.com'},

    ],
    tools: [
        {name: 'Online Wallet & DEX', url: 'https://client.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Chrome Store', url: 'https://chrome.google.com/webstore/detail/turtleshell/billhkeiifjfbbkmmfpcpchikbajnfje?hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell tool', url: 'https://turtleshell.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Android Wallet', url: 'https://play.google.com/store/apps/details?id=com.tn.wallet&hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Statistics', url: 'http://statistics.turtlenetwork.eu/'}

    ],
    tickers: [
        //BTC markets
        {url:'https://www.trusttoken.com/trueusd',asset:'WAVES',assetId:'EzwaF58ssALcUCZ9FbyeD1GTSteoZAQZEDTqBAXHfq8y',priceAsset:'BTC',priceAssetId:'5Asy9P3xjcvBAgbeyiitZhBRJZJ2TPGSZJz9ihDTnB3d', logo: 'waves-dex.svg'},
        //{url:'https://www.trusttoken.com/trueusd',asset:'TUSD',assetId:'2R7raH74LuuiCbJbcv3Aa7g14WY1vYPUGushCUJFwW1f',priceAsset:'BTC',priceAssetId:'5Asy9P3xjcvBAgbeyiitZhBRJZJ2TPGSZJz9ihDTnB3d', logo:'tusd.svg'},
        {url:'https://www.turtlenetwork.eu/#home',asset:'TN',assetId:'TN',priceAsset:'BTC',priceAssetId:'5Asy9P3xjcvBAgbeyiitZhBRJZJ2TPGSZJz9ihDTnB3d', logo:'waves-dex.svg'},

        //TN markets
        {url:'https://www.wagerr.com/',asset:'WGR',assetId:'91NnG9iyUs3ZT3tqK1oQ3ddpgAkE7v5Kbcgp2hhnDhqd',priceAsset:'TN',priceAssetId:'TN', logo:'wgr.svg'},
        {url:'https://www.trusttoken.com/trueusd',asset:'TUSD',assetId:'2R7raH74LuuiCbJbcv3Aa7g14WY1vYPUGushCUJFwW1f',priceAsset:'TN',priceAssetId:'TN', logo:'tusd.svg'},
        {url:'https://www.hellenicnode.eu/',asset:'HN',assetId:'3GvqjyJFBe1fpiYnGsmiZ1YJTkYiRktQ86M2KMzcTb2s',priceAsset:'TN',priceAssetId:'TN', logo:'hn.svg'},
        {url:'https://ethereum.org/',asset:'ETH',assetId:'6Mh41byVWPg8JVCfuwG5CAPCh9Q7gnuaAVxjDfVNDmcD',priceAsset:'TN',priceAssetId:'TN', logo:'eth.svg'},
        {url:'https://dogecoin.com/',asset:'DOGE',assetId:'HDeemVktm2Z68RMkyA7AexhpaCqot1By7adBzaN9j5Xg',priceAsset:'TN',priceAssetId:'TN', logo:'doge.svg'},
        {url:'https://www.dash.org/',asset:'DASH',assetId:'A62sRG58HFbWUNvFoEEjX4U3txXKcLm11MXWWS429qpN',priceAsset:'TN',priceAssetId:'TN', logo:'dash.svg'},
        {url:'https://ether1.org/',asset:'ETHO',assetId:'GzHRyYtdwvaGSkUC4i8d3Xzmsz9aXBWdrpMNszi6bcvR',priceAsset:'TN',priceAssetId:'TN', logo:'ETHO.png'},

        //TN asset markets
        {url:'https://www.turtlenetwork.eu/#home',asset:'TN',assetId:'TN',priceAsset:'WAVES',priceAssetId:'EzwaF58ssALcUCZ9FbyeD1GTSteoZAQZEDTqBAXHfq8y', logo:'tn.svg'},
        {url:'https://www.turtlenetwork.eu/#home',asset:'TN',assetId:'TN',priceAsset:'LTC',priceAssetId:'3vB9hXHTCYbPiQNuyxCQgXF6AvFg51ozGKL9QkwoCwaS', logo:'tn.svg'},

        //LTC markets
        {url:'https://rcanelabs.com',asset:'ACL',assetId:'3HFgaMssup9ssSL139sptsxc2EXLY3Qx5ykY7hf5LD2B',priceAsset:'LTC',priceAssetId:'3vB9hXHTCYbPiQNuyxCQgXF6AvFg51ozGKL9QkwoCwaS', logo:'ACL.svg'},
    ]

};
