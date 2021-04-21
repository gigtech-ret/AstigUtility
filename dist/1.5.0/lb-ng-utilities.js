/*! 
 PROJECT: lb-ng-utilities 
 VERSION: 1.5.0 
 AUTHOR: Ruther John Guevarra 
 GITHUB: https://github.com/terguevarra/
 LATEST BUILD DATE AND TIME: April 21, 2021 11:08 AM PHILIPPINE TIME*/
(function(){
    'use strict';

    var moduleName = 'lbNgUtilities';

    var appDependencies = [];

    angular.module(moduleName, appDependencies);
})();
(function(){
    'use strict';

    angular
        .module('lbNgUtilities')
        .run([function(){

            //To Title Case
            String.prototype.toTitleCase = function(){
                return this.replace(/\w\S/g, function(t) { return t.toUpperCase() });
            }

            //To Sentence Case
            String.prototype.toSentenceCase = function(){
                return this.replace(/[a-z]/i, function (letter) {
                    return letter.toUpperCase();
                }).trim();
            }
        }])
})();
(function () {
    'use strict';

    angular
        .module('lbNgUtilities')
        .service('lbUtilService', utilityService);

    utilityService.$inject = ['$filter', '$window'];

    function utilityService($filter, $window) {
        this.getQueryStringValueByName = getQueryStringValueByName;
        this.array_unique = array_unique;
        this.object_array_unique = object_array_unique;
        this.isValidJsonString = isValidJsonString;
        this.isInArray = isInArray;
        this.isInObjectArray = isInObjectArray;
        this.setYesterdayDate = setYesterdayDate;
        this.toJavaScriptDate = toJavaScriptDate;
        this.guid = guid;
        this.openWindow = openWindow;
        this.formatDate = formatDate;
        this.isValidDateFormat = isValidDateFormat;
        this.addDecimalZeroes = addDecimalZeroes;
        this.convertToFloat = convertToFloat;
        this.toFloatFormat = toFloatFormat;
        this.convertToString = convertToString;
        this.convertToNumber = convertToNumber;
        this.searchInCollectionMultipleFields = searchInCollectionMultipleFields;
        this.getCurrentPage = getCurrentPage;
        this.validateCheckboxSelection = validateCheckboxSelection;
        this.dynamicSort = dynamicSort;
        this.yyyyMMMddDateFormatConverter = yyyyMMMddDateFormatConverter;
        this.objectIsNullorUndefined = objectIsNullorUndefined;
        this.stringIsNullUndefinedOrEmpty = stringIsNullUndefinedOrEmpty;
        this.intIsNullorUndefinedorZero = intIsNullorUndefinedorZero;
        this.decimalIsNullorUndefinedorZero = decimalIsNullorUndefinedorZero;
        this.getListIndex = getListIndex;
        this.validateNullInArray = validateNullInArray;
        this.SumPropertyArray = SumPropertyArray;
        this.mathRandom = mathRandom;
        this.highlightThis = highlightThis;
        this.addPreceedingPad = addPreceedingPad;
        this.setDateForCompare = setDateForCompare;
        this.getBrowserInfo = getBrowserInfo;
        this.getSumArray = getSumArray;
        this.angularJsonStringify = angularJsonStringify;
        this.ifArrayIsInList = ifArrayIsInList;
        this.listToTree = listToTree;
        this.keyValueListToObject = keyValueListToObject;

        function getQueryStringValueByName(_queryname) {
            _queryname = _queryname.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + _queryname + "=([^&#]*)"),
                results = regex.exec(window.location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        function addPreceedingPad(val, size, incrementSize) {
            if (incrementSize) {
                val = parseInt(val) + (intIsNullorUndefinedorZero(incrementSize) ? 0 : incrementSize);
            }
            var s = String(val);
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
        }
        function array_unique(arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (result.indexOf(arr[i]) == -1) {
                    result.push(arr[i]);
                }
            }
            return result;
        }

        function object_array_unique(_list, _uniqueField, _returnField) {
            var unique = {};
            var distinct = [];

            for (var i in _list) {
                if (angular.isUndefined(unique[_list[i][_uniqueField]])) {
                    distinct.push(_list[i][_returnField]);
                }
                unique[_list[i][_uniqueField]] = 0;
            }

            return distinct;
        }

        function isValidJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }

        function isInObjectArray(_value, _property, _array) {
            for (var i = 0 ; i < _array.length ; i++) {
                if (_array[i][_property] === _value) {
                    return true;
                }
            }
            return false;
        }

        function setYesterdayDate(_date) {
            var now = null;
            if (_date === undefined) {
                now = new Date();
            }
            else {
                now = new Date(_date);
            }

            var yesterdayMs = now.getTime() - 1000 * 60 * 60 * 24 * 1; // Offset by one day;
            now.setTime(yesterdayMs);
            return now.toString();
        }

        function toJavaScriptDate(_date, _format) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(_date);
            var dt = results !== null ? new Date(parseFloat(results[1])) : _date;
            return $filter('date')(dt, _format);
        }


        function guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        function mathRandom() {
            return Math.random().toString().replace('.', '');
        }

        function openWindow(destination) {
            if (destination.length > 0) {
                $window.open(destination, "_blank");
            }
            return false;
        }

        function formatDate(date, format) {
            return $filter('date')(date, format);
        }

        function isValidDateFormat(date, format) {
            //var isValidFormat = moment(moment(date, format).format(format), format, true).isValid();
            var isValidFormat = moment(date, 'YYYY-MMM-DD', true).isValid();
            if (isValidFormat) {
                return !!(function (d) {
                    return (d !== 'Invalid Date')
                })(new Date(date));
            } else {
                return false;
            }
        }

        function addDecimalZeroes(_num) {
            var value = Number(_num);
            var res = _num.split('.');
            if (_num.indexOf('.') === -1) {
                value = value.toFixed(2);
                _num = value.toString();
            } else if (res[1].length < 3) {
                value = value.toFixed(2);
                _num = value.toString();
            }
            return _num;
        }

        function convertToFloat(_string) {

            _string = _string.replace(/[^0-9.]+/g, '');

            var periodCount = (_string.match(RegExp('\\.', 'g')) || []).length;
            if (periodCount > 1) {
                _string = _string.replace('.', '');
            }

            if (_string[_string.length - 1] != '.') {

                if (_string != '') {
                    _string = parseFloat(_string);
                }
                else {
                    _string = 0;
                }
            }

            return _string;
        }

        function toFloatFormat(_string) {
            _string = _string[_string.length - 1] == '.' ? _string.replace(/.$/, '.0') : _string;
            return _string;
        }

        function convertToString(_number) {
            return $filter('number')(_number, 0);
        }

        function convertToNumber(_string) {
            if (typeof _string === 'string') {
                var num = _string.replace(/[^0-9\.-]+/g, '');
                if (!isNaN(num) && !(num == '')) {
                    _string = Math.round(num);
                }
                else {
                    _string = 0;
                }
            }
            return _string;
        }

        function searchInCollectionMultipleFields(_list, _fieldsToSearch, _keyword) {
            if (_list.length > 0) {

                var parts = _keyword && get_query(_keyword.trim()),
                  keys = _fieldsToSearch;

                if (!parts || !parts.length) return _list;
                return _list.filter(function (obj) {


                    return parts.every(function (part) {
                        return keys.some(function (key) {
                            return String(obj[key]).toLowerCase().indexOf(part.toLowerCase()) > -1;
                        });
                    });
                });
            }
        }

        function get_query(qry) {
            var re = /"([^"]+)"|\S+/g;
            var m;
            var res = [];
            while ((m = re.exec(qry)) !== null) {
                res.push(m[1] ? m[1] : m[0]);
            }
            return res;
        }

        function getCurrentPage(_index, _itemsPerPage) {
            return Math.floor(_index / _itemsPerPage) + 1;
        }

        function validateCheckboxSelection(_list, _property) {
            for (var i = 0; i < _list.length; i++) {
                if (_list[i][_property]) {
                    return true;
                    break;
                }
            }
            return false;
        }

        function dynamicSort(_property, _order) {
            return function (a, b) {
                var result = (a[_property] < b[_property]) ? -1 : (a[_property] > b[_property]) ? 1 : 0;
                return (_order == 'desc') ? (result * -1) : result;
            }
        }

        function yyyyMMMddDateFormatConverter(_date) {
            if (_date !== null) {
                console.log('JSON DATE', _date);
                var m = moment(_date).tz("Asia/Manila").format("YYYY-MMM-DD");

                console.log('MOMENT DATE', m);

                return m;
            } else {
                return _date;
            }
        }


        function objectIsNullorUndefined(_obj) {
            return _obj == null || angular.isUndefined(_obj);
        }

        function stringIsNullUndefinedOrEmpty(_obj) {
            if (_obj == null || angular.isUndefined(_obj)) {
                return true;
            } else {
                if (_obj) {
                    return _obj.toString().trim().length === 0;
                } else {
                    return true;
                }
            }
        }

        function intIsNullorUndefinedorZero(_obj) {
            if (_obj == null || angular.isUndefined(_obj)) {
                return true;
            } else {
                return (parseInt(_obj) || 0) === 0;
            }
        }

        function decimalIsNullorUndefinedorZero(_obj) {
            if (_obj == null || angular.isUndefined(_obj)) {
                return true;
            } else {
                return (parseFloat(_obj) || 0) === 0;
            }
        }

        function getListIndex(_list, _value, _key) {
            return _list.map(function (o) {
                return o[_key];
            }).indexOf(_value);
        }

        function validateNullInArray(_list, _property1, _property2) {
            for (var x = 0; x < _list.length; x++) {

                if (_list[x][_property1] == null || _list[x][_property2] == null) {
                    return true;
                }
            }
            return false;
        }
        function SumPropertyArray(_array, _prop) {
            var total = 0;
            for (var i = 0; i < _array.length; i++) {
                total += parseInt(_array[i][_prop]);
            }
            return total;
        }

        function highlightThis($event) {
            console.log('panis test asdadadsadsadsad');
            $event.target.select();
        }

        function setDateForCompare(_date, _format) {
            var date = moment(_date, _format).format('YYYY-MM-DD').split('-')
            return new Date(date[0], date[1], date[2]).getTime();
        }

        function getBrowserInfo() {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return { name: 'IE ', version: (tem[1] || '') };
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/)
                if (tem != null) { return { name: 'Opera', version: tem[1] }; }
                tem = ua.match(/\Edge\/(\d+)/)
                if (tem != null) { return { name: 'Edge', version: tem[1] }; }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
            return {
                name: M[0],
                version: M[1]
            };
        }

        function getSumArray(_array) {
            return _array.reduce(function (a, b) {
                return a + b;
            }, 0);
        }

        function angularJsonStringify(_obj) {
            return JSON.stringify(_obj, function (key, value) {
                if (key === '$$hashKey') {
                    return undefined;
                }
                return value;
            });
        }

        function ifArrayIsInList(_array, _list){
            for (var i = 0; i < _array.length; i++) {
                if(_list.indexOf(_array[i]) > -1){
                    return true;
                }
            }
            return false;
        }

        function listToTree(_list, _idName, _parentIdName, _childrenPropertyName) {
            var map = {}, node, roots = [], i;
            for (i = 0; i < _list.length; i += 1) {
                map[_list[i][_idName]] = i; 
                _list[i][_childrenPropertyName] = [];
            }
            for (i = 0; i < _list.length; i += 1) {
                node = _list[i];
                if (node[_parentIdName] !== 0) {
                    _list[map[node[_parentIdName]]][_childrenPropertyName].push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        }

        function keyValueListToObject(_list) {
            var obj = {};
            if (_list !== null) {
                _list.forEach(function (rowItem) {
                    obj[rowItem.Key] = rowItem.Value;
                });
            }
            return obj;
        }
    }
})();
(function(){
    'use strict';

    angular
        .module('lbNgUtilities')
        .filter('unique', function () {

        return function (items, filterOn) {
      
          if (filterOn === false) {
            return items;
          }
      
          if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];
      
            var extractValueToCompare = function (item) {
              if (angular.isObject(item) && angular.isString(filterOn)) {
                return item[filterOn];
              } else {
                return item;
              }
            };
      
            angular.forEach(items, function (item) {
              var valueToCheck, isDuplicate = false;
      
              for (var i = 0; i < newItems.length; i++) {
                if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                newItems.push(item);
              }
      
            });
            items = newItems;
          }
          return items;
        };
      });
})();