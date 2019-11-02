(function () {
	'use strict';

	angular.module('web', ['ui.router', 'ui.bootstrap', 'angular-loading-bar', 'angular-growl', 'ngclipboard',
		'vcRecaptcha', 'waves.core.constants', 'waves.core.services']);
})();
(function () {
    'use strict';

    angular.module('web').factory('apiProvider', apiProvider);

    function apiProvider() {
        return function (nodeUrl, dataServiceUrl) {
            return apiInterface(nodeUrl, dataServiceUrl);
        }
    }

    function apiInterface(nodeUrl, dataServiceUrl) {
        return {
            version: nodeUrl + '/node/version',
            status: nodeUrl + '/node/status',
            blocks: {
                seq: function (from, to) {
                    return nodeUrl + '/blocks/seq/' + from + '/' + to;
                },
                byHeight: function (height) {
                    return nodeUrl + '/blocks/at/' + height;
                },
                bySignature: function (signature) {
                    return nodeUrl + '/blocks/signature/' + signature;
                },
                delay: function (fromSig, count) {
                    return nodeUrl + '/blocks/delay/' + fromSig + '/' + count;
                },
                height: nodeUrl + '/blocks/height',
                last: nodeUrl + '/blocks/last',
                headers: {
                    seq: function (from, to) {
                        return nodeUrl + '/blocks/headers/seq/' + from + '/' + to;
                    },
                    byHeight: function (height) {
                        return nodeUrl + '/blocks/headers/at/' + height;
                    },
                    last: nodeUrl + '/blocks/headers/last'
                }
            },
            address: {
                balance: function (address) {
                    return nodeUrl + '/addresses/balance/' + address;
                },

                validate: function (address) {
                    return nodeUrl + '/addresses/validate/' + address;
                },
                balanceDetails: function (address) {
                    return nodeUrl + '/addresses/balance/details/' + address;
                },
                data: function (address) {
                    return nodeUrl + '/addresses/data/' + address;
                },
                script: function (address) {
                    return nodeUrl + '/addresses/scriptInfo/' + address;
                }
            },
            aliases: {
                getAddress: function (alias) {
                    return dataServiceUrl + '/aliases/' + encodeURIComponent(alias);
                },
                forAddress: function (address) {
                    return dataServiceUrl + '/aliases?address=' + encodeURIComponent(address);
                }
            },
            assets: {
                balance: function (address) {
                    return nodeUrl + '/assets/balance/' + address;
                }
            },
            transactions: {
                utxSize: nodeUrl + '/transactions/unconfirmed/size',
                unconfirmed: nodeUrl + '/transactions/unconfirmed',
                info: function (signature) {
                    return nodeUrl + '/transactions/info/' + signature;
                },
                forAddress: function (address) {
                    return nodeUrl + '/transactions/address/' + address + '/limit/100';
                }

            },
            consensus: {
                puz: nodeUrl + '/consensus/puz',
                algo: nodeUrl + '/consensus/algo',
                basetarget: nodeUrl + '/consensus/basetarget',
                generatingBalance: function (address) {
                    return nodeUrl + '/consensus/generatingbalance/' + address;
                }
            },
            peers: {
                all: nodeUrl + '/peers/all',
                connected: nodeUrl + '/peers/connected'
            }
        }
    }
})();
(function () {
    'use strict';

    angular.module('web')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $stateProvider
                .state('general', {
                    url: '/',
                    views: {
                        "main": {
                            controller: 'GeneralCtrl as ctrl',
                            templateUrl: '/templates/general.html'
                        }
                    }
                })
                .state('address-details', {
                    url: '/address/:address',
                    views: {
                        "main": {
                            controller: 'AddressDetailsCtrl as ctrl',
                            templateUrl: '/templates/address-details.html'
                        }
                    }
                })
                .state('alias-details', {
                    url: '/alias/:alias',
                    views: {
                        "main": {
                            controller: 'AliasDetailsCtrl as ctrl',
                            templateUrl: '/templates/alias-details.html'
                        }
                    }
                })
                .state('blocks', {
                    url: '/blocks',
                    views: {
                        "main": {
                            controller: 'BlocksCtrl as ctrl',
                            templateUrl: '/templates/blocks.html'
                        }
                    }
                })
                .state('block-details-sig', {
                    url: '/blocks/s/:signature',
                    views: {
                        "main": {
                            controller: 'BlocksDetailsSigCtrl as ctrl',
                            templateUrl: '/templates/block-details.html'
                        }
                    }
                })
                .state('block-details', {
                    url: '/blocks/:height',
                    views: {
                        "main": {
                            controller: 'BlocksDetailsCtrl as ctrl',
                            templateUrl: '/templates/block-details.html'
                        }
                    }
                })
                .state('tx-details', {
                    url: '/tx/:id',
                    views: {
                        "main": {
                            controller: 'TxDetailsCtrl as ctrl',
                            templateUrl: '/templates/tx-details.html'
                        }
                    }
                })
                .state('peers', {
                    url: '/peers',
                    views: {
                        "main": {
                            controller: 'PeersCtrl as ctrl',
                            templateUrl: '/templates/peers.html'
                        }
                    }
                })
                .state('faucet', {
                    url: '/faucet',
                    views: {
                        "main": {
                            controller: 'FaucetCtrl as ctrl',
                            templateUrl: '/templates/faucet.html'
                        }
                    }
                })
                .state('nodes', {
                    url: '/nodes',
                    views: {
                        "main": {
                            controller: 'NodesCtrl as ctrl',
                            templateUrl: '/templates/nodes.html'
                        }
                    }
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
                rewriteLinks: false
            });
        }
        ]);
})();

(function () {
    'use strict';

    function WavesAssetRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.assetId) {
                if (!ctrl.text)
                    ctrl.text = changesObj.assetId.currentValue;
            }
        }
    }

    angular
        .module('web')
        .component('wavesAssetRef', {
            controller: WavesAssetRefController,
            bindings: {
                assetId: '<',
                maxLength: '<?',
                text: '<?'
            },
            template: '<span ng-if="$ctrl.assetId === null">WAVES</span>' +
                '<waves-transaction-ref ng-if="$ctrl.assetId !== null" tx-id="$ctrl.assetId" text="$ctrl.text"></waves-transaction-ref>'
        });
})();
(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesBlockRef', {
            bindings: {
                height: '<'
            },
            template: '<a ui-sref="block-details({height:$ctrl.height})">{{$ctrl.height}}</a>'
        });
})();
(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesBoolean', {
            bindings: {
                value: '<'
            },
            template: '<i class="glyphicon glyphicon-ok bigger-110 green" ng-if="$ctrl.value"></i>' +
                '<i class="glyphicon glyphicon-remove bigger-110 red" ng-if="!$ctrl.value"></i>'
        });
})();
(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 110;

    function WavesCompiledScriptController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('wavesCompiledScript', {
            controller: WavesCompiledScriptController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="line-height: 30px">{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}</span>' +
                '<waves-copy-button text="$ctrl.text"></waves-copy-button>'
        });
})();
(function () {
    'use strict';

    function WavesCopyButtonController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesCopyButton', {
            controller: WavesCopyButtonController,
            bindings: {
                text: '<?'
            },
            template: '<button class="btn btn-info btn-white btn-xs pull-right no-border" title="Copy to clipboard" ' +
                        'ngclipboard data-clipboard-text="{{$ctrl.text}}">' +
                    '<i class="icon-only glyphicon glyphicon-copy bigger-150"></i>' +
                '</button>'
        });
})();
(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 32;

    function WavesDataKeyController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('wavesDataKey', {
            controller: WavesDataKeyController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}'
        });
})();
(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 100;

    function WavesDataValueController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('wavesDataValue', {
            controller: WavesDataValueController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="line-height: 30px">{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}</span>' +
                '<waves-copy-button text="$ctrl.text"></waves-copy-button>'
        });
})();
(function () {
    'use strict';

    var ADDRESS_PREFIX = 'address:';


    function WavesEndpointRefController(aliasService) {
        var ctrl = this;

        function adjustBindings() {
            if (!ctrl.endpoint)
                return;

            if (ctrl.endpoint.indexOf(ADDRESS_PREFIX) === 0) {
                ctrl.address = ctrl.endpoint.replace(ADDRESS_PREFIX, '');
            }
            else if (aliasService.isAlias(ctrl.endpoint)) {
                ctrl.alias = aliasService.fromString(ctrl.endpoint).text;
            }
            else {
                ctrl.address = ctrl.endpoint;
            }

            ctrl.isAlias = ctrl.alias ? true : false;
            ctrl.isAddress = ctrl.address ? true : false;
        }

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.endpoint) {
                if (changesObj.endpoint.currentValue) {
                    ctrl.endpoint = changesObj.endpoint.currentValue;

                    adjustBindings();
                }
            }
        };

        ctrl.$onInit = function () {
            adjustBindings();
        };
    }

    angular
        .module('web')
        .component('wavesEndpointRef', {
            controller: ['aliasService', WavesEndpointRefController],
            bindings: {
                endpoint: '<',
                maxLength: '<?'
            },
            template: '<a ng-if="$ctrl.isAddress" class="mono" ui-sref="address-details({address:$ctrl.address})" title="{{$ctrl.address}}">' +
                '{{$ctrl.address|limitTo:$ctrl.maxLength}}{{$ctrl.address.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>' +
            '<a ng-if="$ctrl.isAlias" class="mono" ui-sref="alias-details({alias:$ctrl.alias})" title="{{$ctrl.alias}}">' +
                '{{$ctrl.alias|limitTo:$ctrl.maxLength}}{{$ctrl.alias.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>'
        });
})();
(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesNodeLink', {
            bindings: {
                ref: '<'
            },
            template: '<ng-switch on="$ctrl.ref.showAsLink">' +
                '<a ng-switch-when="true" ng-href="{{::$ctrl.ref.url}}" target="_blank">{{::$ctrl.ref.url}}</a>' +
                '<div ng-switch-default>{{::$ctrl.ref.url}}</div>' +
            '</ng-switch>'
        });
})();
(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesPageHeader', {
            bindings: {
                title: '@',
                subtitle: '<'
            },
            template: '<div class="page-header"><h1>{{$ctrl.title}}<small ng-if="$ctrl.subtitle.length > 0">' +
                '<i class="glyphicon glyphicon-menu-right"></i> {{$ctrl.subtitle}}</small></h1></div>'
        });
})();
(function () {
    'use strict';

    function WavesProofsController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesProofs', {
            controller: WavesProofsController,
            bindings: {
                proofs: '<'
            },
            template: '{{$ctrl.proofs.join(", ")}}'
        });
})();
(function () {
    'use strict';

    function WavesScriptController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesScript', {
            controller: WavesScriptController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="word-break: break-word">{{$ctrl.text}}</span>'
        });
})();
(function () {
    'use strict';

    function WavesTransactionRawController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.tx) {
                if (!ctrl.text)
                    ctrl.text = JSON.stringify(changesObj.tx.currentValue, null, 4);
            }
        }
    }

    angular
        .module('web')
        .component('wavesTransactionRaw', {
            controller: WavesTransactionRawController,
            bindings: {
                tx: '<'
            },
            template: '<pre>{{$ctrl.text}}</pre>'
        });
})();
(function () {
    'use strict';

    function WavesTransactionRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.txId) {
                if (!ctrl.text)
                    ctrl.text = changesObj.txId.currentValue;
            }
        }
    }

    angular
        .module('web')
        .component('wavesTransactionRef', {
            controller: WavesTransactionRefController,
            bindings: {
                txId: '<',
                maxLength: '<?',
                text: '<?'
            },
            template: '<a class="mono" ui-sref="tx-details({id:$ctrl.txId})" >' +
                '{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>'
        });
})();
(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesTransactionTable', {
            transclude: true,
            bindings: {
                title: '@'
            },
            template: '<div class="widget-box widget-color-blue2">' +
                '<div class="widget-header widget-header-small widget-header-flat">' +
                    '<h5 class="widget-title"><i class="glyphicon glyphicon-th-list"></i> {{$ctrl.title}}</h5>' +
                '</div>' +
                '<div class="widget-body">' +
                    '<div class="widget-main no-padding" ng-transclude></div>' +
                '</div>' +
            '</div>'
        });
})();
(function () {
    'use strict';

    var NO_TRANSACTIONS_MESSAGE = 'No transactions for this address';
    var NO_ALIASES_MESSAGE = 'No aliases for this address';
    var NO_ASSETS_MESSAGE = 'No assets for this address';
    var NO_DATA_MESSAGE = 'No data transactions for this address';
    var NO_SCRIPT_MESSAGE = 'No script for this address';
    var LOADING_MESSAGE = 'Loading...';

    function AddressDetailsCtrl($http, constants, apiService, aliasService, transactionFormattingService, $stateParams) {
        var ctrl = this;
        ctrl.address = $stateParams.address;
        ctrl.aliases = [];
        ctrl.txs = [];
        ctrl.assets = [];
        ctrl.dataArray = [];
        ctrl.scripts = [];

        ctrl.txsMessage = LOADING_MESSAGE;
        ctrl.aliasesMessage = LOADING_MESSAGE;
        ctrl.assetsMessage = LOADING_MESSAGE;
        ctrl.dataMessage = LOADING_MESSAGE;
        ctrl.scriptsMessage = LOADING_MESSAGE;

        activate();

        function activate() {
            $http.get(apiService.address.balanceDetails(ctrl.address))
                .then(function (response) {
                    ctrl.balance = response.data;
                });
        }

        function postProcessTransaction(tx) {
            switch (tx.type) {
                case constants.EXCHANGE_TRANSACTION_TYPE:
                    tx.amountIn = tx.extras.amount;
                    tx.amountOut = tx.extras.total;
                    tx.sender = tx.extras.from;
                    tx.recipient = tx.extras.to;
                    break;

                case constants.SCRIPT_TRANSFER_TRANSACTION_TYPE:
                    break;

                case constants.MASS_PAYMENT_TRANSACTION_TYPE:
                    if (!tx.outgoing) {
                        var amounts = tx.transfers
                            .filter(function (transfer) {
                                return transfer.recipient === ctrl.address;
                            }).map(function (transfer) {
                                return transfer.amount;
                            });
                        var total = _.reduce(amounts, function (memo, number) {
                            return memo + number;
                        }, 0);

                        var currency = tx.assetId ? Currency.create({id: tx.assetId}) : Currency.WAVES;
                        tx.amountIn = Money.fromCoins(total, currency);
                    }

                    break;

                default:
                    if (tx.outgoing)
                        tx.amountOut = tx.extras.amount;
                    else
                        tx.amountIn = tx.extras.amount;
            }
        }

        this.loadTransactions = function () {
            $http.get(apiService.transactions.forAddress(ctrl.address))
                .then(function (response) {
                    ctrl.txs = response.data[0];
                    ctrl.txs.forEach(function(item) {
                        item.outgoing = (item.sender === ctrl.address);
                        item.amountIn = {};
                        item.amountOut = {};
                    });

                    return transactionFormattingService.processAmountAndFee(ctrl.txs);
                })
                .then(function () {
                    ctrl.txs.forEach(function (item) {
                        postProcessTransaction(item);
                    });

                    if (ctrl.txs.length === 0)
                        ctrl.txsMessage = NO_TRANSACTIONS_MESSAGE;
                })
                .catch(function () {
                    ctrl.txsMessage = 'Error loading transactions';
                });
        };

        this.loadAssets = function () {
            $http.get(apiService.assets.balance(ctrl.address))
                .then(function (response) {
                    ctrl.assets = response.data.balances
                        .filter(function (assetBalance) {
                            return assetBalance.balance > 0
                        })
                        .map(function (assetBalance) {
                            return {
                                id: assetBalance.assetId,
                                balance: assetBalance.balance,
                                name: assetBalance.issueTransaction.name,
                                decimals: assetBalance.issueTransaction.decimals
                            }
                        });

                    if (ctrl.assets.length === 0)
                        ctrl.assetsMessage = NO_ASSETS_MESSAGE;
                })
                .catch(function (error) {
                    ctrl.assetsMessage = 'Error loading assets balance';
                    console.log(error);
                });
        };

        this.loadAliases = function () {
            $http.get(apiService.aliases.forAddress(ctrl.address))
                .then(function (response) {
                    ctrl.aliases = response.data.data.map(function (alias) {
                        return aliasService.fromDataServices(alias);
                    });

                    if (ctrl.aliases.length === 0)
                        ctrl.aliasesMessage = NO_ALIASES_MESSAGE;
                })
                .catch(function (error) {
                    ctrl.aliasesMessage = 'Error loading aliases';
                    console.log(error);
                });
        };

        this.loadData = function () {
            $http.get(apiService.address.data(ctrl.address))
                .then(function (response) {
                    ctrl.dataArray = response.data;

                    if (ctrl.dataArray.length === 0)
                        ctrl.dataMessage = NO_DATA_MESSAGE;
                })
                .catch(function () {
                    ctrl.dataMessage = 'Error loading address data';
                });
        };

        this.loadScript = function () {
            $http.get(apiService.address.script(ctrl.address))
                .then(function (response) {
                    if (response.data.script) {
                        ctrl.scripts = [{
                            script: response.data.script,
                            scriptText: response.data.scriptText,
                            extraFee: response.data.extraFee
                        }]
                    } else {
                        ctrl.scriptsMessage = NO_SCRIPT_MESSAGE;
                    }
                })
                .catch(function () {
                    ctrl.scriptsMessage = 'Error loading script';
                })
        };
    }

    angular.module('web').controller('AddressDetailsCtrl',
        ['$http', 'constants.transactions', 'apiService', 'aliasService', 'transactionFormattingService',
            '$stateParams', AddressDetailsCtrl]);
})();

(function () {
    'use strict';

    function AliasDetailsCtrl($http, $state, apiService, $stateParams) {
        var ctrl = this;

        ctrl.alias = $stateParams.alias;
        ctrl.message = 'Resolving...';

        activate();

        function activate() {
            $http.get(apiService.aliases.getAddress(ctrl.alias))
                .then(function (response) {
                    console.log(response.data);

                    $state.go('address-details', {
                        address: response.data.address
                    });
                })
                .catch(function (message, code) {
                    if (message.error && message.message)
                        ctrl.message = 'Failed to resolve alias. Code (' + message.error + '): ' + message.message;
                    else
                        ctrl.message = 'Failed to make request. Http status: ' + code + '; Message: ' + message;
                });
        }
    }

    angular.module('web').controller('AliasDetailsCtrl', AliasDetailsCtrl);
})();

(function () {
	'use strict';

	function BlocksDetailsSigCtrl($http, apiService, transactionFormattingService, $stateParams, $state) {
		var ctrl = this;
		ctrl.signature = $stateParams.signature;
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {
			$http.get(apiService.blocks.bySignature(ctrl.signature))
				.then(function (response) {
					ctrl.details = response.data;
					ctrl.height = response.data.height;

					ctrl.payments = txs(ctrl.details.transactions, 2).concat(txs(ctrl.details.transactions, 1));
					ctrl.assetIssue = txs(ctrl.details.transactions, 3);
					ctrl.assetReissue = txs(ctrl.details.transactions, 5);
					ctrl.assetTransfer = txs(ctrl.details.transactions, 4);

					ctrl.exchange = txs(ctrl.details.transactions, 7);

					ctrl.leasing = txs(ctrl.details.transactions, 8);
					ctrl.leasingCancel = txs(ctrl.details.transactions, 9);

					ctrl.alias = txs(ctrl.details.transactions, 10);
					ctrl.massPayment = txs(ctrl.details.transactions, 11);

					return transactionFormattingService.processAmountAndFee(ctrl.details.transactions);
				});
		}

		function txs(trans, type) {
			if (trans) {
				return trans.filter(function(tx){return tx.type === type;});
			}
		}

		function nextBlock() {
			$state.go('block-details', {height: ctrl.height + 1});
		}

		function prevBlock() {
			if (ctrl.height > 1)
				$state.go('block-details', {height: ctrl.height - 1});
		}
	}

	angular.module('web').controller('BlocksDetailsSigCtrl', BlocksDetailsSigCtrl);
})();

(function () {
	'use strict';

	var GENESIS_TRANSACTION_TYPE = 1;

	function BlocksDetailsCtrl($http, apiService, transactionFormattingService, $stateParams, $state, constants) {
		var ctrl = this;
		ctrl.height = parseInt($stateParams.height);
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {

			$http.get(apiService.blocks.byHeight(ctrl.height))
				.then(function (response) {
					ctrl.details = response.data;

					ctrl.payments = txs(ctrl.details.transactions, constants.PAYMENT_TRANSACTION_TYPE)
						.concat(txs(ctrl.details.transactions, GENESIS_TRANSACTION_TYPE));
					ctrl.assetIssue = txs(ctrl.details.transactions, 3);
					ctrl.assetReissue = txs(ctrl.details.transactions, 5);
					ctrl.assetTransfer = txs(ctrl.details.transactions, 4);
					ctrl.assetBurn = txs(ctrl.details.transactions, 6);

					ctrl.exchange = txs(ctrl.details.transactions, 7);

					ctrl.leasing = txs(ctrl.details.transactions, 8);
					ctrl.leasingCancel = txs(ctrl.details.transactions, 9);

					ctrl.alias = txs(ctrl.details.transactions, constants.CREATE_ALIAS_TRANSACTION_TYPE);
					ctrl.massPayment = txs(ctrl.details.transactions, constants.MASS_PAYMENT_TRANSACTION_TYPE);
					ctrl.dataTransactions = txs(ctrl.details.transactions, constants.DATA_TRANSACTION_TYPE);
					ctrl.scripts = txs(ctrl.details.transactions, constants.SCRIPT_TRANSFER_TRANSACTION_TYPE);
					ctrl.sponsorships = txs(ctrl.details.transactions, constants.SPONSOR_FEE_TRANSACTION_TYPE);

					return transactionFormattingService.processAmountAndFee(ctrl.details.transactions);
				})
		}

		function txs(trans, type) {
			if (trans) {
				return trans.filter(function(tx){return tx.type === type;});
			}
		}

		function nextBlock() {
			$state.go('block-details', {height: ctrl.height + 1});
		}

		function prevBlock() {
			if (ctrl.height > 1)
				$state.go('block-details', {height: ctrl.height - 1});
		}
	}

	angular.module('web').controller('BlocksDetailsCtrl',
		['$http', 'apiService', 'transactionFormattingService', '$stateParams', '$state', 'constants.transactions',
			BlocksDetailsCtrl]);
})();

(function () {
    'use strict';

    function BlocksCtrl($http, apiService, cryptoService) {
        var ctrl = this;

        ctrl.numPerPage = 20;
        ctrl.currentPage = 1;
        ctrl.pageChanged = changePage;

        activate();

        function activate() {
            $http.get(apiService.blocks.height).then(function (response) {
                ctrl.height = response.data.height;
                ctrl.totalCount = ctrl.height;
                changePage();
            })
        }

        function changePage() {
            var from = ctrl.height - ctrl.currentPage * ctrl.numPerPage;
            var correction = 0;
            if (from < 0) {
                correction = from - 1;
                from = 1;
            }
            var to = from + ctrl.numPerPage + correction;

            $http.get(apiService.blocks.headers.seq(from, to)).then(function (response) {
                ctrl.blocks = response.data;
                ctrl.blocks.reverse();
            });
        }
    }

    angular.module('web').controller('BlocksCtrl', BlocksCtrl);
})();
(function () {
	'use strict';

	function FaucetCtrl($http, apiService, appConfig, vcRecaptchaService) {
		var ctrl = this;

		if (appConfig.faucet) {
			ctrl.pubKey = appConfig.faucet.captchaKey;
			ctrl.uri = appConfig.faucet.url + "/payment";
		}

		ctrl.recipient = "";
		ctrl.invalidAddress = false;
		ctrl.error = null;

		ctrl.response = null;
		ctrl.widgetId = null;

		ctrl.getMoney = getMoney;
		ctrl.setResponse = function (response) {
            ctrl.response = response;
        };

		ctrl.setWidgetId = function (widgetId) {
			ctrl.widgetId = widgetId;
		};

		ctrl.cbExpiration = function() {
			vcRecaptchaService.reload(ctrl.widgetId);
			ctrl.response = null;
		};

		function getMoney() {
			ctrl.invalidAddress = false;
			ctrl.tx = null;
			ctrl.error = null;

			if (!ctrl.recipient || ctrl.recipient.length == 0) {
				ctrl.invalidAddress = true;
				return;
			}
			if (ctrl.response == null || ctrl.response === "") {
				ctrl.error = "Please resolve the captcha";
				return;
			}
			validateAddress(ctrl.recipient).then(function (response) {
					if (response.data.valid) {
						var newPayment = {
							token: ctrl.response,
							recipient: cleanAddress(ctrl.recipient)
						};

						$http.post(ctrl.uri, newPayment).then(function (response) {
							if (response.data.status == "OK") {
								ctrl.tx = response.data.tx;
							} else {
								ctrl.error = response.data.message;
								vcRecaptchaService.reload(ctrl.widgetId);
							}
						})
						.catch(function (response) {
							if (response.data) {
								ctrl.error = response.data.message;
								vcRecaptchaService.reload(ctrl.widgetId);
							}
						});
					} else {
						ctrl.invalidAddress = true;
					}
				});
		}

		function validateAddress(address) {
			return $http.get(apiService.address.validate(cleanAddress(address)))
		}

		function cleanAddress(address) { return address.replace(/^1W/,""); }
	}

	angular.module('web').controller('FaucetCtrl', FaucetCtrl)
})();

(function () {
    'use strict';

    function GeneralCtrl($http, apiService) {
        var ctrl = this;
        ctrl.consensus = {};
        ctrl.consensus.algo = 'waves';

        activate();

        function activate() {
            $http.get(apiService.version).then(function (response) {
                ctrl.version = response.data.version;
            });

            $http.get(apiService.status).then(function (response) {
                ctrl.status = response.data;
            });

            $http.get(apiService.blocks.height).then(function (response) {
                var to = ctrl.height = response.data.height;
                var from = to - 20;
                if (from < 0)
                    from = 1;
                $http.get(apiService.blocks.headers.seq(from, to)).then(function (response) {
                    ctrl.lastBlocks = response.data;
                    ctrl.lastBlocks.reverse();
                });
                // get avg delay between blocks
                var height = ctrl.height;
                $http.get(apiService.blocks.headers.last).then(function (response) {
                    $http.get(apiService.blocks.delay(response.data.signature, height - 2)).then(function (response) {
                        ctrl.avgBlockDelay = parseInt(response.data.delay) / 1000.0 / 60.0;
                    });
                });
            });

            $http.get(apiService.transactions.unconfirmed).then(function (response) {
                ctrl.unconfirmedTxs = response.data;
                ctrl.unconfirmedTxs.forEach(function (item) {
                    item.amount = item.amount || item.totalAmount;
                })
            });
            $http.get(apiService.consensus.basetarget).then(function (response) {
                ctrl.consensus.baseTarget = response.data.baseTarget;
            });
        }
    }

    angular.module('web').controller('GeneralCtrl', GeneralCtrl);
})();

(function() {
  'use strict'

  function MainCtrl(appConfig) {
    var ctrl = this;
    ctrl.title = appConfig.title;
  }
  angular.module('web').controller('MainCtrl', MainCtrl);
})();

(function () {
    'use strict';

    angular
        .module('web')
        .controller('NavigationCtrl', ['$scope', 'appConfig', function ($scope, config) {
            var nav = this;

            var menuItems = [];
            menuItems.push({
                url: 'blocks',
                title: 'Blocks',
                icon: 'glyphicon glyphicon-th-list'
            });
            menuItems.push({
                url: 'peers',
                title: 'Peers',
                icon: 'glyphicon glyphicon-transfer'
            });
            if (config.faucet) {
                menuItems.push({
                    url: 'faucet',
                    title: 'Faucet',
                    icon: 'glyphicon glyphicon-filter'
                });
            }
            menuItems.push({
                url: 'nodes',
                title: 'Nodes',
                icon: 'glyphicon glyphicon-tasks'
            });
            nav.menuItems = menuItems;

            nav.wallet = config.wallet;
            nav.peerExplorer = config.peerExplorer;
        }]);
})();

(function () {
    'use strict';

    function NodesCtrl($http, apiProvider, appConfig) {
        var ctrl = this;
        ctrl.nodes = appConfig.nodes;
        ctrl.title = appConfig.blockchainName + ' Nodes';

        activate();

        function activate() {
            ctrl.nodes.forEach(function (node) {

                $http.get(apiProvider(node.url).version).then(function (response) {
                    node.version = response.data.version;
                })
                .catch(function () {
                    node.version = "error";
                });

                $http.get(apiProvider(node.url).blocks.height).then(function (response) {
                    node.height = response.data.height;
                })
                .catch(function () {
                    node.height = "error";
                });

                $http.get(apiProvider(node.url).consensus.basetarget).then(function (response) {
                    node.baseTarget = response.data.baseTarget;
                })
                .catch(function () {
                    node.baseTarget = "error";
                });

                $http.get(apiProvider(node.url).transactions.utxSize).then(function (response) {
                    node.utxSize = response.data.size;
                })
                .catch(function () {
                    node.utxSize = 'N/A'
                });
            });
        }
    }

    angular.module('web').controller('NodesCtrl', NodesCtrl);
})();

(function() {
	'use strict';

	function PeersCtrl($http, apiService) {
		var ctrl = this;

		activate();

		function activate() {
			$http.get(apiService.peers.all).then(function (response) {
				ctrl.peers = response.data;
			});
			$http.get(apiService.peers.connected).then(function (response) {
				ctrl.connectedPeers = response.data.peers;
			});
		}
	}

	angular.module('web').controller('PeersCtrl', PeersCtrl);
})();

(function () {
    'use strict';

    var GROWL_CONFIG = {
        ttl: 2000,
        disableCountDown: true
    };

    function SearchCtrl($scope, $state, $http, apiService, growl) {

        $scope.search = search;

        function tryGetTx(id) {
            $http.get(apiService.transactions.info(id)).then(function (response) {
                if (!response.data.error)
                    $state.go('tx-details', {
                        id: id
                    });
            }).catch(function () {
                growl.info('Nothing has been found for query \'' + id + '\'', GROWL_CONFIG);
            })
        }

        function search() {
            var q = $scope.searchQuery;
            if (!q) return;
            // check address
            q = q.trim().replace(/\{/g, '').replace(/}/g, '');
            var addr = q;
            $http.get(apiService.address.validate(addr)).then(function (response) {
                if (response.data.valid)
                    $state.go('address-details', {
                        address: addr
                    });
                else {
                    // check block
                    $http.get(apiService.blocks.bySignature(q)).then(function (response) {
                        if (!response.data.error) {
                            $state.go('block-details-sig', {
                                signature: q
                            })
                        } else {
                            // check tx
                            tryGetTx(q);
                        }
                    })
                    .catch(function () {
                        tryGetTx(q);
                    });
                }
            })
            .catch(function () {
                growl.error('Failed to make request.<br/> Check your internet connection', GROWL_CONFIG);
            });
        }
    }

    angular.module('web').controller('SearchCtrl', SearchCtrl);
})();

(function() {
    'use strict';

    function TxDetailsCtrl($http, transactionFormattingService, $stateParams, apiService, cryptoService, constants) {
        var ctrl = this;
        ctrl.id = $stateParams.id;
        ctrl.isUnknownTransaction = false;

        activate();


        function activate() {
            $http.get(apiService.transactions.info(ctrl.id)).then(function (response) {
                ctrl.details = response.data;

                ctrl.isUnknownTransaction = ctrl.details.type > _.max(_.values(constants));

                return transactionFormattingService.processAmountAndFee([ctrl.details]);
            }).then(function () {
                if (ctrl.details.type === constants.EXCHANGE_TRANSACTION_TYPE) {
                    var pair = _.extend({}, ctrl.details.order1.assetPair);
                    if (pair.amountAsset === null)
                        pair.amountAsset = '';
                    if (pair.priceAsset === null)
                        pair.priceAsset = '';

                    if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                        var currencyPair = {
                            amountAsset: Currency.create({id: pair.amountAsset}),
                            priceAsset: Currency.create({id: pair.priceAsset})
                        };

                        ctrl.details.order1.price = OrderPrice.fromBackendPrice(ctrl.details.order1.price, currencyPair).toTokens().toFixed(8);
                        ctrl.details.order1.amount = Money.fromCoins(ctrl.details.order1.amount, currencyPair.amountAsset).formatAmount();
                        ctrl.details.order1.address = cryptoService.buildRawAddress(ctrl.details.order1.senderPublicKey);
                        ctrl.details.order2.price = OrderPrice.fromBackendPrice(ctrl.details.order2.price, currencyPair).toTokens().toFixed(8);
                        ctrl.details.order2.amount = Money.fromCoins(ctrl.details.order2.amount, currencyPair.amountAsset).formatAmount();
                        ctrl.details.order2.address = cryptoService.buildRawAddress(ctrl.details.order2.senderPublicKey);
                    }
                } else if (ctrl.details.type === constants.MASS_PAYMENT_TRANSACTION_TYPE) {
                    var currency = Currency.WAVES;
                    if (ctrl.details.assetId)
                        currency = Currency.create({id: ctrl.details.assetId});

                    ctrl.details.transfers.forEach(function (item) {
                        var amount = Money.fromCoins(item.amount, currency);
                        item.extras = {
                            amount: {
                                amount: amount.formatAmount(),
                                currency: currency.toString()
                            }
                        }
                    });
                }
            });
        }
    }

    angular.module('web').controller('TxDetailsCtrl',
        ['$http', 'transactionFormattingService', '$stateParams', 'apiService', 'cryptoService', 'constants.transactions',
            TxDetailsCtrl]);
})();

(function() {
    'use strict';

    angular.module('web').filter('assetunits', function() {
        return function(input, decimals) {
            if (input == null) return null;
            var waves = input / Math.pow(10, decimals);
            var str = addCommas(waves.toFixed(decimals));

            // remove trailing zeros
            var parts = str.split('.');
            if (parts.length == 2) {
                parts[1] = trimZeros(parts[1]);
                parts[1] = parts[1].length == 0 ? "0" : parts[1]
                return parts[0] + "." + parts[1]
            }

            return str;
        };

        function trimZeros(str) {
            if (str.length == 0 || str[str.length - 1] != '0')
                return str;
            return trimZeros(str.substring(0, str.length - 1))
        }

        function addCommas(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    });
})();

(function() {
    'use strict';

    var GENESIS_TRANSACTION_TYPE = 1;

    angular.module('web').filter('txtype', ['constants.transactions', function(constants) {
        var TRANSACTION_TYPES = buildTransactionTypesTable();

        return function(input, useLongNames) {
            if (!angular.isNumber(input))
                return null;

            var type = parseInt(input);

            return getTransactionTypeName(type, useLongNames);
        };

        function getTransactionTypeName(type, useLongNames) {
            var name = TRANSACTION_TYPES[type];
            if (!name)
                return 'Unknown';

            return (!useLongNames && name.short) ? name.short : name.long;
        }

        function buildTransactionTypesTable() {
            var result = {};
            result[GENESIS_TRANSACTION_TYPE] = {
                long: 'Genesis'
            };
            result[constants.PAYMENT_TRANSACTION_TYPE] = {
                long: 'Payment'
            };
            result[constants.ASSET_ISSUE_TRANSACTION_TYPE] = {
                long: 'Asset issue'
            };
            result[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = {
                long: 'Transfer'
            };
            result[constants.ASSET_REISSUE_TRANSACTION_TYPE] = {
                long: 'Asset re-issue'
            };
            result[constants.ASSET_BURN_TRANSACTION_TYPE] = {
                long: 'Asset burn'
            };
            result[constants.EXCHANGE_TRANSACTION_TYPE] = {
                long: 'Exchange'
            };
            result[constants.START_LEASING_TRANSACTION_TYPE] = {
                long: 'Start leasing'
            };
            result[constants.CANCEL_LEASING_TRANSACTION_TYPE] = {
                long: 'Cancel leasing'
            };
            result[constants.CREATE_ALIAS_TRANSACTION_TYPE] = {
                short: 'Alias',
                long: 'Create alias'
            };
            result[constants.MASS_PAYMENT_TRANSACTION_TYPE] = {
                long: 'Mass payment'
            };
            result[constants.DATA_TRANSACTION_TYPE] = {
                long: 'Data'
            };
            result[constants.SCRIPT_TRANSFER_TRANSACTION_TYPE] = {
                long: 'Script'
            };
            result[constants.SPONSOR_FEE_TRANSACTION_TYPE] = {
                long: 'Fee sponsorship'
            };

            return result;
        }
    }]);
})();

(function() {
    'use strict';

    angular.module('web').filter('wavelets', function() {
        return function(input) {
            if (input == null) return null;
            var waves = input / 100000000;
            var str = addCommas(waves.toFixed(8));

            // remove trailing zeros
            var parts = str.split('.');
            parts[1] = trimZeros(parts[1]);
            parts[1] = parts[1].length == 0 ? "0" : parts[1];
            return parts[0] + "." + parts[1]
        };

        function trimZeros(str) {
            if (str.length == 0 || str[str.length - 1] != '0')
                return str;
            return trimZeros(str.substring(0, str.length - 1))
        }

        function addCommas(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    });
})();

(function() {
    'use strict';

    angular.module('web').filter('wavesdate', function($filter) {
        var originalDateFilter = $filter('date');

        return function(input) {
            return originalDateFilter(input, 'yyyy-MM-dd HH:mm:ss');
        };
    });
})();

(function (){
    'use strict';

    var ALIAS_PREFIX = 'alias';

    function Alias(networkCode, alias) {
        this.networkCode = networkCode;

        this.text = alias.trim();

        this.toString = function () {
            return ALIAS_PREFIX + ':' + this.networkCode + ':' + this.text;
        }
    }

    Alias.isAlias = function (candidate) {
        return candidate.trim().search(ALIAS_PREFIX) == 0;
    };

    Alias.fromString = function (candidate) {
        var parts = candidate.split(':');
        if (parts.length != 3)
            throw new Error('Too few elements in alias: ' + candidate);

        if (parts[0] !== ALIAS_PREFIX)
            throw new Error('Unexpected alias prefix: ' + candidate);

        return new Alias(parts[1], parts[2])
    };

    Alias.fromDataServices = function (alias) {
        if (alias.__type !== 'alias')
            throw new Error('Unknown alias object: ' + JSON.stringify(alias));

        return new Alias('', alias.data.alias);
    };

    function AliasService() {
        this.isAlias = function (candidate) {
            return Alias.isAlias(candidate);
        };

        this.fromString = function (alias) {
            return Alias.fromString(alias)
        };

        this.fromDataServices = function (alias) {
            return Alias.fromDataServices(alias);
        }
    }

    angular.module('web').service('aliasService', [AliasService]);

})();
(function (){
    'use strict';

    angular.module('web').factory('apiService', ['appConfig', 'apiProvider', ApiService]);

    function ApiService(appConfig, apiProvider) {
        return apiProvider(appConfig.apiDomain, appConfig.dataServiceBaseUrl);
    }
})();
(function () {
    'use strict';

    var LOADING_TEXT = '...';
    var FAILURE_TEXT = 'Failure';
    var GENESIS_TRANSACTION_TYPE = 1;

    var FAILED_TO_CONVERT_AMOUNT = {
        amount: FAILURE_TEXT,
        currency: FAILURE_TEXT
    };

    function TransactionFormattingService($http, $q, apiService, cryptoService, constants) {
        var txToUpdate = [];
        var loadFees = [];
        var loadAmounts = [];
        var loadAssets = {};
        var processors = {};
        processors[GENESIS_TRANSACTION_TYPE] = postProcessPaymentTransaction;
        processors[constants.PAYMENT_TRANSACTION_TYPE] = postProcessPaymentTransaction;
        processors[constants.ASSET_ISSUE_TRANSACTION_TYPE] = postProcessIssueTransaction;
        processors[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = postProcessTransferTransaction;
        processors[constants.ASSET_BURN_TRANSACTION_TYPE] = postProcessBurnTransaction;
        processors[constants.EXCHANGE_TRANSACTION_TYPE] = postProcessExchangeTransaction;
        processors[constants.ASSET_REISSUE_TRANSACTION_TYPE] = postProcessReissueTransaction;
        processors[constants.START_LEASING_TRANSACTION_TYPE] = postProcessLeasingTransaction;
        processors[constants.MASS_PAYMENT_TRANSACTION_TYPE] = postProcessMassPaymentTransaction;
        processors[constants.SCRIPT_TRANSFER_TRANSACTION_TYPE] = postProcessScriptTransaction;
        processors[constants.SPONSOR_FEE_TRANSACTION_TYPE] = postProcessSponsorshipTransaction;

        function postProcessTransferTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.amount, transaction.assetId);

            return transaction;
        }

        function postProcessBurnTransaction(transaction) {
            return postProcessTransferTransaction(transaction);
        }

        function postProcessMassPaymentTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.totalAmount, transaction.assetId);

            transaction.update = function () {
                updateFee(transaction);
                updateMassPaymentAmount(transaction);
            };

            return transaction;
        }

        function postProcessPaymentTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.amount, Currency.WAVES.id);

            return transaction;
        }

        function postProcessIssueTransaction(transaction) {
            processFee(transaction);

            var currency = createCurrencyFromIssueTransaction(transaction);
            transaction.extras.amount.amount = Money.fromCoins(transaction.quantity, currency).formatAmount();
            transaction.extras.amount.currency = currency.toString();

            return transaction;
        }

        function createCurrencyFromIssueTransaction(transaction) {
            return Currency.create({
                id: transaction.assetId,
                displayName: transaction.name,
                precision: transaction.decimals
            });
        }

        function postProcessReissueTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.quantity, transaction.assetId);

            transaction.update = function () {
                updateFee(transaction);
                updateReissueAmount(transaction);
            };

            return transaction;
        }

        function postProcessAmountlessTransaction(transaction) {
            processFee(transaction);

            transaction.update = function () {
                updateFee(transaction);
            };

            return transaction;
        }

        function postProcessLeasingTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.amount, Currency.WAVES.id);

            return transaction;
        }

        function postProcessScriptTransaction(transaction) {
            transaction.recipient = transaction.sender;

            processFee(transaction);

            transaction.update = function () {
            };

            return transaction;
        }

        function postProcessSponsorshipTransaction(transaction) {
            processFee(transaction);

            if (transaction.minSponsoredAssetFee)
                processAmount(transaction, transaction.minSponsoredAssetFee, transaction.assetId);

            transaction.update = function () {
                updateSponsorshipTransactionAmount(transaction);
            }
        }

        function postProcessExchangeTransaction(transaction) {
            processFee(transaction);

            var pair = _.extend({}, transaction.order1.assetPair);
            if (pair.amountAsset === null)
                pair.amountAsset = '';
            if (pair.priceAsset === null)
                pair.priceAsset = '';

            processAmount(transaction, transaction.amount, pair.amountAsset);

            transaction.pair = pair;
            transaction.update = function () {
                updateFee(transaction);
                updateExchangeAmount(transaction);
                updateExchangeCurrencies(transaction);
            };

            var from = transaction.order1.orderType === 'buy' ? transaction.order2.senderPublicKey : transaction.order1.senderPublicKey;
            var to = transaction.order1.orderType === 'sell' ? transaction.order2.senderPublicKey : transaction.order1.senderPublicKey;

            var price;
            if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                var currencyPair = {
                    amountAsset: Currency.create({id: pair.amountAsset}),
                    priceAsset: Currency.create({id: pair.priceAsset})
                };
                var orderPrice = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens();
                var amount = Money.fromCoins(transaction.amount, currencyPair.amountAsset);
                price = orderPrice.toFixed(8);
                transaction.extras.priceCurrency = currencyPair.priceAsset.toString();
                transaction.extras.amountCurrency = currencyPair.amountAsset.toString();
                transaction.extras.total.amount = (price * amount.toTokens()).toFixed(currencyPair.priceAsset.precision);
                transaction.extras.total.currency = transaction.extras.priceCurrency;
            } else {
                if (!Currency.isCached(pair.priceAsset))
                    loadAssets[pair.priceAsset] = true;

                txToUpdate.push(transaction);

                price = transaction.price.toString();
            }

            transaction.extras.from = cryptoService.buildRawAddress(from);
            transaction.extras.to = cryptoService.buildRawAddress(to);
            transaction.extras.price = price;

            return transaction;
        }

        function processAmount(transaction, rawAmount, assetId) {
            var currency = Currency.WAVES;
            if (assetId) {
                if (!Currency.isCached(assetId)) {
                    txToUpdate.push(transaction);
                    loadAssets[assetId] = true;

                    console.log(assetId);

                    return
                }

                currency = Currency.create({id: assetId});
            }

            transaction.extras.amount.amount = Money.fromCoins(rawAmount, currency).formatAmount();
            transaction.extras.amount.currency = currency.toString();
        }

        function processFee(transaction) {
            var currency = Currency.WAVES;
            var assetId = transaction.feeAsset;
            if (assetId) {
                if (!Currency.isCached(assetId)) {
                    txToUpdate.push(transaction);
                    loadAssets[assetId] = true;

                    return
                }

                currency = Currency.create({id: assetId});
            }

            transaction.extras.fee = formatFee(transaction.fee, currency);
        }

        function formatFee(fee, currency) {
            return Money.fromCoins(fee, currency).formatAmount(true) + ' ' + currency.toString();
        }

        function processTransaction(transaction) {
            var processor = processors[transaction.type];
            if (processor)
                processor(transaction);
            else
                postProcessAmountlessTransaction(transaction);
        }

        function updateFee(transaction) {
            if (!transaction.feeAsset)
                return;

            if (!Currency.isCached(transaction.feeAsset)) {
                transaction.extras.fee = FAILURE_TEXT;
            }
            else {
                var currency = Currency.create({id: transaction.feeAsset});
                transaction.extras.fee = formatFee(transaction.fee, currency);
            }
        }

        function updateAmount(transaction) {
            if (!transaction.assetId)
                return;

            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateReissueAmount(transaction) {
            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.quantity, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateMassPaymentAmount(transaction) {
            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.totalAmount, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateSponsorshipTransactionAmount(transaction) {
            if (!transaction.minSponsoredAssetFee)
                return;

            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.minSponsoredAssetFee, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateExchangeAmount(transaction) {
            var pair = transaction.pair;
            if (!pair.amountAsset)
                return;

            if (!Currency.isCached(pair.amountAsset)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: pair.amountAsset});
                transaction.extras.amount.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateExchangeCurrencies(transaction) {
            var pair = transaction.pair;
            if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                var currencyPair = {
                    amountAsset: Currency.create({id: pair.amountAsset}),
                    priceAsset: Currency.create({id: pair.priceAsset})
                };
                var price = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens();
                var amount = Money.fromCoins(transaction.amount, currencyPair.amountAsset);
                transaction.extras.price = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens().toFixed(8);
                transaction.extras.priceCurrency = currencyPair.priceAsset.toString();
                transaction.extras.total.amount = (price * amount.toTokens()).toFixed(currencyPair.priceAsset.precision);
                transaction.extras.total.currency = transaction.extras.priceCurrency;
            }
        }

        this.processAmountAndFee = function (transactions) {
            loadFees = [];
            loadAmounts = [];
            loadAssets = {};

            transactions.forEach(function (item) {
                item.extras = {
                    fee: LOADING_TEXT,
                    amount: {
                        amount: LOADING_TEXT,
                        currency: LOADING_TEXT
                    },
                    total: {
                        amount: LOADING_TEXT,
                        currency: LOADING_TEXT
                    },
                    version: item.version || 'N/A',
                    proofs: item.proofs || [item.signature]
                };
                item.update = function () {
                    updateFee(item);
                    updateAmount(item);
                };

                processTransaction(item);
            });

            var promises = Object.keys(loadAssets).map(function (assetId) {
                return $http.get(apiService.transactions.info(assetId))
                    .then(function (response) {
                        createCurrencyFromIssueTransaction(response.data);
                    })
            });

            return $q.all(promises).then(function () {
                txToUpdate.forEach(function (transaction) {
                    transaction.update();
                });
            });
        }
    }

    angular
        .module('web')
        .service('transactionFormattingService', ['$http', '$q', 'apiService', 'cryptoService', 'constants.transactions',
            TransactionFormattingService]);
})();
