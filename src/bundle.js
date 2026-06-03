var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/fuzzysort/fuzzysort.js
var require_fuzzysort = __commonJS((exports, module) => {
  ((root, UMD) => {
    if (typeof define === "function" && define.amd)
      define([], UMD);
    else if (typeof module === "object" && module.exports)
      module.exports = UMD();
    else
      root["fuzzysort"] = UMD();
  })(exports, (_) => {
    var single = (search, target) => {
      if (!search || !target)
        return NULL;
      var preparedSearch = getPreparedSearch(search);
      if (!isPrepared(target))
        target = getPrepared(target);
      var searchBitflags = preparedSearch.bitflags;
      if ((searchBitflags & target._bitflags) !== searchBitflags)
        return NULL;
      return algorithm(preparedSearch, target);
    };
    var go = (search, targets, options) => {
      if (!search)
        return options?.all ? all(targets, options) : noResults;
      var preparedSearch = getPreparedSearch(search);
      var searchBitflags = preparedSearch.bitflags;
      var containsSpace = preparedSearch.containsSpace;
      var threshold = denormalizeScore(options?.threshold || 0);
      var limit = options?.limit || INFINITY;
      var resultsLen = 0;
      var limitedCount = 0;
      var targetsLen = targets.length;
      function push_result(result2) {
        if (resultsLen < limit) {
          q.add(result2);
          ++resultsLen;
        } else {
          ++limitedCount;
          if (result2._score > q.peek()._score)
            q.replaceTop(result2);
        }
      }
      if (options?.key) {
        var key = options.key;
        for (var i = 0;i < targetsLen; ++i) {
          var obj = targets[i];
          var target = getValue(obj, key);
          if (!target)
            continue;
          if (!isPrepared(target))
            target = getPrepared(target);
          if ((searchBitflags & target._bitflags) !== searchBitflags)
            continue;
          var result = algorithm(preparedSearch, target);
          if (result === NULL)
            continue;
          if (result._score < threshold)
            continue;
          result.obj = obj;
          push_result(result);
        }
      } else if (options?.keys) {
        var keys = options.keys;
        var keysLen = keys.length;
        outer:
          for (var i = 0;i < targetsLen; ++i) {
            var obj = targets[i];
            {
              var keysBitflags = 0;
              for (var keyI = 0;keyI < keysLen; ++keyI) {
                var key = keys[keyI];
                var target = getValue(obj, key);
                if (!target) {
                  tmpTargets[keyI] = noTarget;
                  continue;
                }
                if (!isPrepared(target))
                  target = getPrepared(target);
                tmpTargets[keyI] = target;
                keysBitflags |= target._bitflags;
              }
              if ((searchBitflags & keysBitflags) !== searchBitflags)
                continue;
            }
            if (containsSpace)
              for (let i2 = 0;i2 < preparedSearch.spaceSearches.length; i2++)
                keysSpacesBestScores[i2] = NEGATIVE_INFINITY;
            for (var keyI = 0;keyI < keysLen; ++keyI) {
              target = tmpTargets[keyI];
              if (target === noTarget) {
                tmpResults[keyI] = noTarget;
                continue;
              }
              tmpResults[keyI] = algorithm(preparedSearch, target, false, containsSpace);
              if (tmpResults[keyI] === NULL) {
                tmpResults[keyI] = noTarget;
                continue;
              }
              if (containsSpace)
                for (let i2 = 0;i2 < preparedSearch.spaceSearches.length; i2++) {
                  if (allowPartialMatchScores[i2] > -1000) {
                    if (keysSpacesBestScores[i2] > NEGATIVE_INFINITY) {
                      var tmp = (keysSpacesBestScores[i2] + allowPartialMatchScores[i2]) / 4;
                      if (tmp > keysSpacesBestScores[i2])
                        keysSpacesBestScores[i2] = tmp;
                    }
                  }
                  if (allowPartialMatchScores[i2] > keysSpacesBestScores[i2])
                    keysSpacesBestScores[i2] = allowPartialMatchScores[i2];
                }
            }
            if (containsSpace) {
              for (let i2 = 0;i2 < preparedSearch.spaceSearches.length; i2++) {
                if (keysSpacesBestScores[i2] === NEGATIVE_INFINITY)
                  continue outer;
              }
            } else {
              var hasAtLeast1Match = false;
              for (let i2 = 0;i2 < keysLen; i2++) {
                if (tmpResults[i2]._score !== NEGATIVE_INFINITY) {
                  hasAtLeast1Match = true;
                  break;
                }
              }
              if (!hasAtLeast1Match)
                continue;
            }
            var objResults = new KeysResult(keysLen);
            for (let i2 = 0;i2 < keysLen; i2++) {
              objResults[i2] = tmpResults[i2];
            }
            if (containsSpace) {
              var score = 0;
              for (let i2 = 0;i2 < preparedSearch.spaceSearches.length; i2++)
                score += keysSpacesBestScores[i2];
            } else {
              var score = NEGATIVE_INFINITY;
              for (let i2 = 0;i2 < keysLen; i2++) {
                var result = objResults[i2];
                if (result._score > -1000) {
                  if (score > NEGATIVE_INFINITY) {
                    var tmp = (score + result._score) / 4;
                    if (tmp > score)
                      score = tmp;
                  }
                }
                if (result._score > score)
                  score = result._score;
              }
            }
            objResults.obj = obj;
            objResults._score = score;
            if (options?.scoreFn) {
              score = options.scoreFn(objResults);
              if (!score)
                continue;
              score = denormalizeScore(score);
              objResults._score = score;
            }
            if (score < threshold)
              continue;
            push_result(objResults);
          }
      } else {
        for (var i = 0;i < targetsLen; ++i) {
          var target = targets[i];
          if (!target)
            continue;
          if (!isPrepared(target))
            target = getPrepared(target);
          if ((searchBitflags & target._bitflags) !== searchBitflags)
            continue;
          var result = algorithm(preparedSearch, target);
          if (result === NULL)
            continue;
          if (result._score < threshold)
            continue;
          push_result(result);
        }
      }
      if (resultsLen === 0)
        return noResults;
      var results = new Array(resultsLen);
      for (var i = resultsLen - 1;i >= 0; --i)
        results[i] = q.poll();
      results.total = resultsLen + limitedCount;
      return results;
    };
    var highlight = (result, open = "<b>", close = "</b>") => {
      var callback = typeof open === "function" ? open : undefined;
      var target = result.target;
      var targetLen = target.length;
      var indexes = result.indexes;
      var highlighted = "";
      var matchI = 0;
      var indexesI = 0;
      var opened = false;
      var parts = [];
      for (var i = 0;i < targetLen; ++i) {
        var char = target[i];
        if (indexes[indexesI] === i) {
          ++indexesI;
          if (!opened) {
            opened = true;
            if (callback) {
              parts.push(highlighted);
              highlighted = "";
            } else {
              highlighted += open;
            }
          }
          if (indexesI === indexes.length) {
            if (callback) {
              highlighted += char;
              parts.push(callback(highlighted, matchI++));
              highlighted = "";
              parts.push(target.substr(i + 1));
            } else {
              highlighted += char + close + target.substr(i + 1);
            }
            break;
          }
        } else {
          if (opened) {
            opened = false;
            if (callback) {
              parts.push(callback(highlighted, matchI++));
              highlighted = "";
            } else {
              highlighted += close;
            }
          }
        }
        highlighted += char;
      }
      return callback ? parts : highlighted;
    };
    var prepare = (target) => {
      if (typeof target === "number")
        target = "" + target;
      else if (typeof target !== "string")
        target = "";
      var info = prepareLowerInfo(target);
      return new_result(target, { _targetLower: info._lower, _targetLowerCodes: info.lowerCodes, _bitflags: info.bitflags });
    };
    var cleanup = () => {
      preparedCache.clear();
      preparedSearchCache.clear();
    };

    class Result {
      get ["indexes"]() {
        return this._indexes.slice(0, this._indexes.len).sort((a, b) => a - b);
      }
      set ["indexes"](indexes) {
        return this._indexes = indexes;
      }
      ["highlight"](open, close) {
        return highlight(this, open, close);
      }
      get ["score"]() {
        return normalizeScore(this._score);
      }
      set ["score"](score) {
        this._score = denormalizeScore(score);
      }
    }

    class KeysResult extends Array {
      get ["score"]() {
        return normalizeScore(this._score);
      }
      set ["score"](score) {
        this._score = denormalizeScore(score);
      }
    }
    var new_result = (target, options) => {
      const result = new Result;
      result["target"] = target;
      result["obj"] = options.obj ?? NULL;
      result._score = options._score ?? NEGATIVE_INFINITY;
      result._indexes = options._indexes ?? [];
      result._targetLower = options._targetLower ?? "";
      result._targetLowerCodes = options._targetLowerCodes ?? NULL;
      result._nextBeginningIndexes = options._nextBeginningIndexes ?? NULL;
      result._bitflags = options._bitflags ?? 0;
      return result;
    };
    var normalizeScore = (score) => {
      if (score === NEGATIVE_INFINITY)
        return 0;
      if (score > 1)
        return score;
      return Math.E ** (((-score + 1) ** 0.04307 - 1) * -2);
    };
    var denormalizeScore = (normalizedScore) => {
      if (normalizedScore === 0)
        return NEGATIVE_INFINITY;
      if (normalizedScore > 1)
        return normalizedScore;
      return 1 - Math.pow(Math.log(normalizedScore) / -2 + 1, 1 / 0.04307);
    };
    var prepareSearch = (search) => {
      if (typeof search === "number")
        search = "" + search;
      else if (typeof search !== "string")
        search = "";
      search = search.trim();
      var info = prepareLowerInfo(search);
      var spaceSearches = [];
      if (info.containsSpace) {
        var searches = search.split(/\s+/);
        searches = [...new Set(searches)];
        for (var i = 0;i < searches.length; i++) {
          if (searches[i] === "")
            continue;
          var _info = prepareLowerInfo(searches[i]);
          spaceSearches.push({ lowerCodes: _info.lowerCodes, _lower: searches[i].toLowerCase(), containsSpace: false });
        }
      }
      return { lowerCodes: info.lowerCodes, _lower: info._lower, containsSpace: info.containsSpace, bitflags: info.bitflags, spaceSearches };
    };
    var getPrepared = (target) => {
      if (target.length > 999)
        return prepare(target);
      var targetPrepared = preparedCache.get(target);
      if (targetPrepared !== undefined)
        return targetPrepared;
      targetPrepared = prepare(target);
      preparedCache.set(target, targetPrepared);
      return targetPrepared;
    };
    var getPreparedSearch = (search) => {
      if (search.length > 999)
        return prepareSearch(search);
      var searchPrepared = preparedSearchCache.get(search);
      if (searchPrepared !== undefined)
        return searchPrepared;
      searchPrepared = prepareSearch(search);
      preparedSearchCache.set(search, searchPrepared);
      return searchPrepared;
    };
    var all = (targets, options) => {
      var results = [];
      results.total = targets.length;
      var limit = options?.limit || INFINITY;
      if (options?.key) {
        for (var i = 0;i < targets.length; i++) {
          var obj = targets[i];
          var target = getValue(obj, options.key);
          if (target == NULL)
            continue;
          if (!isPrepared(target))
            target = getPrepared(target);
          var result = new_result(target.target, { _score: target._score, obj });
          results.push(result);
          if (results.length >= limit)
            return results;
        }
      } else if (options?.keys) {
        for (var i = 0;i < targets.length; i++) {
          var obj = targets[i];
          var objResults = new KeysResult(options.keys.length);
          for (var keyI = options.keys.length - 1;keyI >= 0; --keyI) {
            var target = getValue(obj, options.keys[keyI]);
            if (!target) {
              objResults[keyI] = noTarget;
              continue;
            }
            if (!isPrepared(target))
              target = getPrepared(target);
            target._score = NEGATIVE_INFINITY;
            target._indexes.len = 0;
            objResults[keyI] = target;
          }
          objResults.obj = obj;
          objResults._score = NEGATIVE_INFINITY;
          results.push(objResults);
          if (results.length >= limit)
            return results;
        }
      } else {
        for (var i = 0;i < targets.length; i++) {
          var target = targets[i];
          if (target == NULL)
            continue;
          if (!isPrepared(target))
            target = getPrepared(target);
          target._score = NEGATIVE_INFINITY;
          target._indexes.len = 0;
          results.push(target);
          if (results.length >= limit)
            return results;
        }
      }
      return results;
    };
    var algorithm = (preparedSearch, prepared, allowSpaces = false, allowPartialMatch = false) => {
      if (allowSpaces === false && preparedSearch.containsSpace)
        return algorithmSpaces(preparedSearch, prepared, allowPartialMatch);
      var searchLower = preparedSearch._lower;
      var searchLowerCodes = preparedSearch.lowerCodes;
      var searchLowerCode = searchLowerCodes[0];
      var targetLowerCodes = prepared._targetLowerCodes;
      var searchLen = searchLowerCodes.length;
      var targetLen = targetLowerCodes.length;
      var searchI = 0;
      var targetI = 0;
      var matchesSimpleLen = 0;
      for (;; ) {
        var isMatch = searchLowerCode === targetLowerCodes[targetI];
        if (isMatch) {
          matchesSimple[matchesSimpleLen++] = targetI;
          ++searchI;
          if (searchI === searchLen)
            break;
          searchLowerCode = searchLowerCodes[searchI];
        }
        ++targetI;
        if (targetI >= targetLen)
          return NULL;
      }
      var searchI = 0;
      var successStrict = false;
      var matchesStrictLen = 0;
      var nextBeginningIndexes = prepared._nextBeginningIndexes;
      if (nextBeginningIndexes === NULL)
        nextBeginningIndexes = prepared._nextBeginningIndexes = prepareNextBeginningIndexes(prepared.target);
      targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
      var backtrackCount = 0;
      if (targetI !== targetLen)
        for (;; ) {
          if (targetI >= targetLen) {
            if (searchI <= 0)
              break;
            ++backtrackCount;
            if (backtrackCount > 200)
              break;
            --searchI;
            var lastMatch = matchesStrict[--matchesStrictLen];
            targetI = nextBeginningIndexes[lastMatch];
          } else {
            var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
            if (isMatch) {
              matchesStrict[matchesStrictLen++] = targetI;
              ++searchI;
              if (searchI === searchLen) {
                successStrict = true;
                break;
              }
              ++targetI;
            } else {
              targetI = nextBeginningIndexes[targetI];
            }
          }
        }
      var substringIndex = searchLen <= 1 ? -1 : prepared._targetLower.indexOf(searchLower, matchesSimple[0]);
      var isSubstring = !!~substringIndex;
      var isSubstringBeginning = !isSubstring ? false : substringIndex === 0 || prepared._nextBeginningIndexes[substringIndex - 1] === substringIndex;
      if (isSubstring && !isSubstringBeginning) {
        for (var i = 0;i < nextBeginningIndexes.length; i = nextBeginningIndexes[i]) {
          if (i <= substringIndex)
            continue;
          for (var s = 0;s < searchLen; s++)
            if (searchLowerCodes[s] !== prepared._targetLowerCodes[i + s])
              break;
          if (s === searchLen) {
            substringIndex = i;
            isSubstringBeginning = true;
            break;
          }
        }
      }
      var calculateScore = (matches) => {
        var score2 = 0;
        var extraMatchGroupCount = 0;
        for (var i2 = 1;i2 < searchLen; ++i2) {
          if (matches[i2] - matches[i2 - 1] !== 1) {
            score2 -= matches[i2];
            ++extraMatchGroupCount;
          }
        }
        var unmatchedDistance = matches[searchLen - 1] - matches[0] - (searchLen - 1);
        score2 -= (12 + unmatchedDistance) * extraMatchGroupCount;
        if (matches[0] !== 0)
          score2 -= matches[0] * matches[0] * 0.2;
        if (!successStrict) {
          score2 *= 1000;
        } else {
          var uniqueBeginningIndexes = 1;
          for (var i2 = nextBeginningIndexes[0];i2 < targetLen; i2 = nextBeginningIndexes[i2])
            ++uniqueBeginningIndexes;
          if (uniqueBeginningIndexes > 24)
            score2 *= (uniqueBeginningIndexes - 24) * 10;
        }
        score2 -= (targetLen - searchLen) / 2;
        if (isSubstring)
          score2 /= 1 + searchLen * searchLen * 1;
        if (isSubstringBeginning)
          score2 /= 1 + searchLen * searchLen * 1;
        score2 -= (targetLen - searchLen) / 2;
        return score2;
      };
      if (!successStrict) {
        if (isSubstring)
          for (var i = 0;i < searchLen; ++i)
            matchesSimple[i] = substringIndex + i;
        var matchesBest = matchesSimple;
        var score = calculateScore(matchesBest);
      } else {
        if (isSubstringBeginning) {
          for (var i = 0;i < searchLen; ++i)
            matchesSimple[i] = substringIndex + i;
          var matchesBest = matchesSimple;
          var score = calculateScore(matchesSimple);
        } else {
          var matchesBest = matchesStrict;
          var score = calculateScore(matchesStrict);
        }
      }
      prepared._score = score;
      for (var i = 0;i < searchLen; ++i)
        prepared._indexes[i] = matchesBest[i];
      prepared._indexes.len = searchLen;
      const result = new Result;
      result.target = prepared.target;
      result._score = prepared._score;
      result._indexes = prepared._indexes;
      return result;
    };
    var algorithmSpaces = (preparedSearch, target, allowPartialMatch) => {
      var seen_indexes = new Set;
      var score = 0;
      var result = NULL;
      var first_seen_index_last_search = 0;
      var searches = preparedSearch.spaceSearches;
      var searchesLen = searches.length;
      var changeslen = 0;
      var resetNextBeginningIndexes = () => {
        for (let i2 = changeslen - 1;i2 >= 0; i2--)
          target._nextBeginningIndexes[nextBeginningIndexesChanges[i2 * 2 + 0]] = nextBeginningIndexesChanges[i2 * 2 + 1];
      };
      var hasAtLeast1Match = false;
      for (var i = 0;i < searchesLen; ++i) {
        allowPartialMatchScores[i] = NEGATIVE_INFINITY;
        var search = searches[i];
        result = algorithm(search, target);
        if (allowPartialMatch) {
          if (result === NULL)
            continue;
          hasAtLeast1Match = true;
        } else {
          if (result === NULL) {
            resetNextBeginningIndexes();
            return NULL;
          }
        }
        var isTheLastSearch = i === searchesLen - 1;
        if (!isTheLastSearch) {
          var indexes = result._indexes;
          var indexesIsConsecutiveSubstring = true;
          for (let i2 = 0;i2 < indexes.len - 1; i2++) {
            if (indexes[i2 + 1] - indexes[i2] !== 1) {
              indexesIsConsecutiveSubstring = false;
              break;
            }
          }
          if (indexesIsConsecutiveSubstring) {
            var newBeginningIndex = indexes[indexes.len - 1] + 1;
            var toReplace = target._nextBeginningIndexes[newBeginningIndex - 1];
            for (let i2 = newBeginningIndex - 1;i2 >= 0; i2--) {
              if (toReplace !== target._nextBeginningIndexes[i2])
                break;
              target._nextBeginningIndexes[i2] = newBeginningIndex;
              nextBeginningIndexesChanges[changeslen * 2 + 0] = i2;
              nextBeginningIndexesChanges[changeslen * 2 + 1] = toReplace;
              changeslen++;
            }
          }
        }
        score += result._score / searchesLen;
        allowPartialMatchScores[i] = result._score / searchesLen;
        if (result._indexes[0] < first_seen_index_last_search) {
          score -= (first_seen_index_last_search - result._indexes[0]) * 2;
        }
        first_seen_index_last_search = result._indexes[0];
        for (var j = 0;j < result._indexes.len; ++j)
          seen_indexes.add(result._indexes[j]);
      }
      if (allowPartialMatch && !hasAtLeast1Match)
        return NULL;
      resetNextBeginningIndexes();
      var allowSpacesResult = algorithm(preparedSearch, target, true);
      if (allowSpacesResult !== NULL && allowSpacesResult._score > score) {
        if (allowPartialMatch) {
          for (var i = 0;i < searchesLen; ++i) {
            allowPartialMatchScores[i] = allowSpacesResult._score / searchesLen;
          }
        }
        return allowSpacesResult;
      }
      if (allowPartialMatch)
        result = target;
      result._score = score;
      var i = 0;
      for (let index of seen_indexes)
        result._indexes[i++] = index;
      result._indexes.len = i;
      return result;
    };
    var remove_accents = (str) => str.replace(/\p{Script=Latin}+/gu, (match) => match.normalize("NFD")).replace(/[\u0300-\u036f]/g, "");
    var prepareLowerInfo = (str) => {
      str = remove_accents(str);
      var strLen = str.length;
      var lower = str.toLowerCase();
      var lowerCodes = [];
      var bitflags = 0;
      var containsSpace = false;
      for (var i = 0;i < strLen; ++i) {
        var lowerCode = lowerCodes[i] = lower.charCodeAt(i);
        if (lowerCode === 32) {
          containsSpace = true;
          continue;
        }
        var bit = lowerCode >= 97 && lowerCode <= 122 ? lowerCode - 97 : lowerCode >= 48 && lowerCode <= 57 ? 26 : lowerCode <= 127 ? 30 : 31;
        bitflags |= 1 << bit;
      }
      return { lowerCodes, bitflags, containsSpace, _lower: lower };
    };
    var prepareBeginningIndexes = (target) => {
      var targetLen = target.length;
      var beginningIndexes = [];
      var beginningIndexesLen = 0;
      var wasUpper = false;
      var wasAlphanum = false;
      for (var i = 0;i < targetLen; ++i) {
        var targetCode = target.charCodeAt(i);
        var isUpper = targetCode >= 65 && targetCode <= 90;
        var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
        var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
        wasUpper = isUpper;
        wasAlphanum = isAlphanum;
        if (isBeginning)
          beginningIndexes[beginningIndexesLen++] = i;
      }
      return beginningIndexes;
    };
    var prepareNextBeginningIndexes = (target) => {
      target = remove_accents(target);
      var targetLen = target.length;
      var beginningIndexes = prepareBeginningIndexes(target);
      var nextBeginningIndexes = [];
      var lastIsBeginning = beginningIndexes[0];
      var lastIsBeginningI = 0;
      for (var i = 0;i < targetLen; ++i) {
        if (lastIsBeginning > i) {
          nextBeginningIndexes[i] = lastIsBeginning;
        } else {
          lastIsBeginning = beginningIndexes[++lastIsBeginningI];
          nextBeginningIndexes[i] = lastIsBeginning === undefined ? targetLen : lastIsBeginning;
        }
      }
      return nextBeginningIndexes;
    };
    var preparedCache = new Map;
    var preparedSearchCache = new Map;
    var matchesSimple = [];
    var matchesStrict = [];
    var nextBeginningIndexesChanges = [];
    var keysSpacesBestScores = [];
    var allowPartialMatchScores = [];
    var tmpTargets = [];
    var tmpResults = [];
    var getValue = (obj, prop) => {
      var tmp = obj[prop];
      if (tmp !== undefined)
        return tmp;
      if (typeof prop === "function")
        return prop(obj);
      var segs = prop;
      if (!Array.isArray(prop))
        segs = prop.split(".");
      var len = segs.length;
      var i = -1;
      while (obj && ++i < len)
        obj = obj[segs[i]];
      return obj;
    };
    var isPrepared = (x) => {
      return typeof x === "object" && typeof x._bitflags === "number";
    };
    var INFINITY = Infinity;
    var NEGATIVE_INFINITY = -INFINITY;
    var noResults = [];
    noResults.total = 0;
    var NULL = null;
    var noTarget = prepare("");
    var fastpriorityqueue = (r) => {
      var e = [], o = 0, a = {}, v = (r2) => {
        for (var a2 = 0, v2 = e[a2], c = 1;c < o; ) {
          var s = c + 1;
          a2 = c, s < o && e[s]._score < e[c]._score && (a2 = s), e[a2 - 1 >> 1] = e[a2], c = 1 + (a2 << 1);
        }
        for (var f = a2 - 1 >> 1;a2 > 0 && v2._score < e[f]._score; f = (a2 = f) - 1 >> 1)
          e[a2] = e[f];
        e[a2] = v2;
      };
      return a.add = (r2) => {
        var a2 = o;
        e[o++] = r2;
        for (var v2 = a2 - 1 >> 1;a2 > 0 && r2._score < e[v2]._score; v2 = (a2 = v2) - 1 >> 1)
          e[a2] = e[v2];
        e[a2] = r2;
      }, a.poll = (r2) => {
        if (o !== 0) {
          var a2 = e[0];
          return e[0] = e[--o], v(), a2;
        }
      }, a.peek = (r2) => {
        if (o !== 0)
          return e[0];
      }, a.replaceTop = (r2) => {
        e[0] = r2, v();
      }, a;
    };
    var q = fastpriorityqueue();
    return { single, go, prepare, cleanup };
  });
});

// src/constants.ts
var TABLE_CONFIG = {
  BATCH_SIZE: 30
};
var TIMEOUTS = {
  TABLE_INIT: 500,
  LOAD_UNLOCK: 50
};
var CC = {
  Layout: "#6366f1",
  Flexbox: "#8b5cf6",
  Grid: "#7c3aed",
  Typography: "#14b8a6",
  Color: "#f59e0b",
  Sizing: "#06b6d4",
  Visual: "#84cc16",
  Animation: "#f43f5e",
  Transform: "#10b981",
  Spacing: "#f97316",
  Interactivity: "#0ea5e9",
  "CSS Variables": "#a855f7",
  Queries: "#e11d48",
  Selectors: "#7c3aed",
  "UI Components": "#0891b2",
  Tables: "#65a30d",
  Lists: "#d97706",
  Misc: "#6b7280",
  Breaks: "#db2777"
};
var IL = {
  wide: "Available",
  b2024: "Baseline 2024",
  b2023: "Baseline 2023",
  b2022: "Baseline 2022",
  ltd: "Limited",
  exp: "Experimental"
};
var IC = {
  wide: "#15803d",
  b2024: "#166534",
  b2023: "#14532d",
  b2022: "#15803d",
  ltd: "#a16207",
  exp: "#b91c1c"
};
var INTEROP_SORT_RANK = {
  wide: 1,
  b2024: 2,
  b2023: 3,
  b2022: 4,
  ltd: 5,
  exp: 6
};

// src/data/layout.ts
function createDisplayDemo() {
  return `<div style="padding:10px 14px;display:flex;flex-direction:column;gap:7px;width:100%">
    <div style="display:flex;gap:6px">
      <div style="background:#6366f1;color:#fff;width:100%;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700">display: block — full width</div>
    </div>
    <div style="display:flex;gap:6px">
      <span style="background:#8b5cf6;color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700">inline</span>
      <span style="background:#a78bfa;color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700">inline</span>
      <span style="background:#c4b5fd;color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700">inline</span>
    </div>
  </div>`;
}
function createPositionDemo() {
  return `<div style="position:relative;width:160px;height:70px;background:#e0e7ff;border-radius:6px;border:2px dashed #6366f1">
    <div style="position:absolute;top:8px;left:8px;background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700">absolute</div>
    <div style="position:absolute;bottom:8px;right:8px;background:#8b5cf6;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700">absolute</div>
  </div>`;
}
function createZIndexDemo() {
  return `<div style="position:relative;width:160px;height:72px">
    <div style="position:absolute;left:0;top:10px;width:80px;height:55px;background:#6366f1;border-radius:6px;display:flex;align-items:flex-start;padding:6px;z-index:1">
      <span style="color:#fff;font-size:10px;font-weight:700">z-index: 1</span>
    </div>
    <div style="position:absolute;left:40px;top:4px;width:80px;height:55px;background:#ec4899;border-radius:6px;display:flex;align-items:flex-start;padding:6px;z-index:2">
      <span style="color:#fff;font-size:10px;font-weight:700">z-index: 2</span>
    </div>
    <div style="position:absolute;left:80px;top:0;width:80px;height:55px;background:#f97316;border-radius:6px;display:flex;align-items:flex-start;padding:6px;z-index:3">
      <span style="color:#fff;font-size:10px;font-weight:700">z-index: 3</span>
    </div>
  </div>`;
}
function createOverflowDemo() {
  return `<div style="display:flex;gap:12px;align-items:center">
    <div style="width:80px;height:60px;background:#e0e7ff;border:2px solid #6366f1;border-radius:6px;overflow:hidden;padding:6px">
      <p style="font-size:9px;font-weight:700;color:#6366f1;white-space:nowrap">overflow: hidden clips text that goes beyond the boundary here</p>
    </div>
    <div style="width:80px;height:60px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;overflow:visible;padding:6px">
      <p style="font-size:9px;font-weight:700;color:#8b5cf6;white-space:nowrap">overflow: visible — text spills out</p>
    </div>
  </div>`;
}
function createInsetDemo() {
  return `<div style="position:relative;width:150px;height:72px;background:#f0fdf4;border:2px dashed #10b981;border-radius:6px">
    <div style="position:absolute;inset:10px;background:#10b981;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">inset: 10px</div>
  </div>`;
}
function createContainDemo() {
  return `<div style="display:flex;gap:10px">
    <div style="width:100px;height:68px;contain:strict;background:#e0e7ff;border:2px solid #6366f1;border-radius:6px;overflow:hidden;padding:6px">
      <p style="font-size:9px;font-weight:700;color:#6366f1">contain: strict<br>Layout isolated</p>
    </div>
    <div style="width:100px;height:68px;background:#f5f3ff;border:2px dashed #8b5cf6;border-radius:6px;padding:6px">
      <p style="font-size:9px;font-weight:700;color:#8b5cf6">No contain<br>Normal flow</p>
    </div>
  </div>`;
}
function createContainerDemo() {
  return `<div style="container-type:inline-size;width:200px;border:2px solid #7c3aed;border-radius:6px;padding:8px;background:#f5f3ff">
    <p style="font-size:10px;font-weight:700;color:#7c3aed;margin-bottom:4px">container-type: inline-size</p>
    <div style="display:flex;gap:4px">
      <div style="flex:1;background:#7c3aed;color:#fff;border-radius:3px;padding:4px;font-size:9px;font-weight:700;text-align:center">@container</div>
      <div style="flex:1;background:#8b5cf6;color:#fff;border-radius:3px;padding:4px;font-size:9px;font-weight:700;text-align:center">responsive</div>
    </div>
  </div>`;
}
function createObjectFitDemo() {
  return `<div style="display:flex;gap:8px">
    <div style="width:70px;height:70px;background:#e0e7ff;border:2px solid #6366f1;border-radius:6px;overflow:hidden">
      <img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%236366f1' width='100' height='50'/%3E%3C/svg%3E" style="width:100%;height:100%;object-fit:cover">
    </div>
    <div style="width:70px;height:70px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;overflow:hidden">
      <img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50'%3E%3Crect fill='%238b5cf6' width='100' height='50'/%3E%3C/svg%3E" style="width:100%;height:100%;object-fit:contain">
    </div>
  </div>`;
}
function createObjectPositionDemo() {
  return `<div style="display:flex;gap:8px">
    <div style="width:80px;height:60px;background:#e0e7ff;border:2px solid #6366f1;border-radius:6px;overflow:hidden">
      <img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%236366f1'/%3E%3C/svg%3E" style="width:100%;height:100%;object-fit:none;object-position:center">
    </div>
    <div style="width:80px;height:60px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;overflow:hidden">
      <img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%238b5cf6'/%3E%3C/svg%3E" style="width:100%;height:100%;object-fit:none;object-position:top right">
    </div>
  </div>`;
}
function createAnchorNameDemo() {
  return `<div style="padding:10px;position:relative;width:180px">
    <div style="anchor-name:--demo-anchor;width:60px;height:40px;background:#6366f1;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">Anchor</div>
    <div style="position:absolute;position-anchor:--demo-anchor;top:0;left:70px;background:#f0fdf4;border:2px dashed #10b981;border-radius:4px;padding:6px 10px;font-size:9px;font-weight:700;color:#15803d">anchor: --demo-anchor</div>
    <p style="font-size:8px;color:#888;margin-top:6px;font-weight:700">anchor-name on blue box</p>
  </div>`;
}
function createPositionAnchorDemo() {
  return `<div style="padding:10px;position:relative;width:180px">
    <div style="anchor-name:--target-anchor;width:60px;height:40px;background:#8b5cf6;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">Anchor</div>
    <div style="position:absolute;position-anchor:--target-anchor;top:anchor(top);left:anchor(right);margin-left:8px;background:#fef3c7;border:2px solid #f59e0b;border-radius:4px;padding:6px 10px;font-size:9px;font-weight:700;color:#b45309">position-anchor<br>--target-anchor</div>
  </div>`;
}
function createPositionAreaDemo() {
  return `<div style="padding:10px;position:relative;width:180px;height:80px">
    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);anchor-name:--area-anchor;width:50px;height:30px;background:#6366f1;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:700">Anchor</div>
    <div style="position:absolute;position-anchor:--area-anchor;position-area:top;background:#ec4899;color:#fff;padding:3px 8px;border-radius:3px;font-size:8px;font-weight:700">position-area: top</div>
  </div>`;
}
function createPositionTryDemo() {
  return `<div style="padding:10px;position:relative;width:180px;height:78px">
    <div style="position:absolute;right:8px;top:28px;anchor-name:--try-anchor;width:60px;height:28px;background:#6366f1;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:700">Anchor</div>
    <div style="position:absolute;position-anchor:--try-anchor;position-area:right;position-try:flip-inline flip-block;position-try-fallbacks:flip-inline,flip-block;background:#fef9c3;border:2px dashed #ca8a04;border-radius:4px;padding:4px 6px;font-size:8px;font-weight:700;color:#a16207">position-try fallback</div>
  </div>`;
}
var layout = [
  {
    name: "display",
    category: "Layout",
    description: "Defines how an element is rendered in the layout flow — block, inline, flex, grid, none, contents, and flow-root.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "display: block | inline | flex | grid | none | contents | flow-root",
    mdnPath: "display",
    default: "block",
    demo: createDisplayDemo(),
    values: [
      { value: "block", label: "Block", description: "Elements take full width available. Stack vertically one after another. Default for <div>, <p>, <h1>." },
      { value: "inline", label: "Inline", description: "Elements flow within text. Only take as much width as their content. Cannot have width/height. Default for <span>, <a>." },
      { value: "inline-block", label: "Inline Block", description: "Flows like inline but can have width/height. Great for nav items that need sizing but flow in text." },
      { value: "flex", label: "Flex", description: "Creates a flex container. Enables flexible layouts with align-items, justify-content. Children become flex items." },
      { value: "grid", label: "Grid", description: "Creates a grid container. Enables two-dimensional layouts with rows and columns. Children become grid items." },
      { value: "none", label: "None", description: "Element is completely removed from the layout. Not rendered at all. Takes no space." },
      { value: "contents", label: "Contents", description: "The element itself is skipped. Its children become direct children of the parent. Useful for flattening structure." },
      { value: "flow-root", label: "Flow Root", description: "Creates a new block formatting context. Like a mini-root that contains floats. Useful for clearing floats." }
    ]
  },
  {
    name: "position",
    category: "Layout",
    description: "Specifies how an element is positioned — static, relative, absolute, fixed, or sticky.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "position: static | relative | absolute | fixed | sticky",
    mdnPath: "position",
    default: "static",
    demo: createPositionDemo(),
    values: [
      { value: "static", label: "Static", description: "Default position. Element follows normal document flow. top, bottom, left, right, z-index have no effect." },
      { value: "relative", label: "Relative", description: "Element stays in normal flow but can be offset with top, right, bottom, left. Creates a positioning context for children." },
      { value: "absolute", label: "Absolute", description: "Element is removed from normal flow. Positions relative to nearest positioned ancestor. No space reserved for it." },
      { value: "fixed", label: "Fixed", description: "Element is removed from normal flow. Positions relative to the viewport. Stays in place when scrolling." },
      { value: "sticky", label: "Sticky", description: "Hybrid between relative and fixed. Acts relative until it hits a threshold, then fixed. Great for sticky headers." }
    ]
  },
  {
    name: "z-index",
    category: "Layout",
    description: "Sets the stacking order of positioned elements along the Z axis.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "z-index: auto | 10 | -1",
    mdnPath: "z-index",
    default: "auto",
    demo: createZIndexDemo(),
    values: [
      { value: "auto", label: "Auto", description: "Stack order determined by DOM order. Elements later in HTML appear on top. Default value." },
      { value: "number", label: "Number (e.g., 1, 10, 100)", description: "Higher values appear on top. Works only on positioned elements (not static). Can use negative values." },
      { value: "negative", label: "Negative (e.g., -1)", description: "Elements appear behind their parent's content. Useful for layering backgrounds behind elements." }
    ]
  },
  {
    name: "overflow",
    category: "Layout",
    description: "Controls what happens when content overflows its container — visible, hidden, scroll, auto, or clip.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "overflow: visible | hidden | scroll | auto | clip",
    mdnPath: "overflow",
    demo: createOverflowDemo(),
    values: [
      { value: "visible", label: "Visible", description: "Content that overflows is visible outside the box. May overlap other elements. Default behavior." },
      { value: "hidden", label: "Hidden", description: "Overflowing content is clipped and hidden. No scrollbar appears. Content is inaccessible." },
      { value: "scroll", label: "Scroll", description: "Content can be scrolled. Scrollbars appear even if there's no overflow. Provides consistent layout." },
      { value: "auto", label: "Auto", description: "Scrollbars appear only when needed. Best for most cases. Content is accessible when it overflows." },
      { value: "clip", label: "Clip", description: "Like hidden but removes entire element from tree. No accessibility tree. Content completely inaccessible." }
    ]
  },
  {
    name: "inset",
    category: "Layout",
    description: "Logical shorthand for top, right, bottom, and left simultaneously.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "inset: 0 | 1rem | 0 auto | 10% 20px",
    mdnPath: "inset",
    demo: createInsetDemo()
  },
  {
    name: "contain",
    category: "Layout",
    description: "Marks an element as independent from the rest of the page tree, enabling layout and paint optimisations.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "contain: none | strict | content | size | layout | style | paint",
    mdnPath: "contain",
    demo: createContainDemo()
  },
  {
    name: "container",
    category: "Layout",
    description: "Shorthand for container-name and container-type — opt-in to container queries.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "container: sidebar / inline-size",
    mdnPath: "container",
    demo: createContainerDemo()
  },
  {
    name: "content-visibility",
    category: "Layout",
    description: "Tells the browser it can skip rendering off-screen elements — massive performance gains.",
    support: { ch: 1, ff: 1, sf: 0, ed: 1 },
    interop: "ltd",
    example: "content-visibility: visible | auto | hidden",
    mdnPath: "content-visibility",
    demo: `<div style="display:flex;flex-direction:column;gap:6px;width:200px">
      <div style="background:#dcfce7;border:2px solid #16a34a;border-radius:4px;padding:5px 8px;font-size:10px;font-weight:700;color:#15803d">✓ Rendered (in viewport)</div>
      <div style="background:#fef9c3;border:2px dashed #ca8a04;border-radius:4px;padding:5px 8px;font-size:10px;font-weight:700;color:#a16207">⚡ Skipped (off-screen)</div>
    </div>`
  },
  {
    name: "object-fit",
    category: "Layout",
    description: "Specifies how an image or video should be resized to fit its container — cover, contain, fill, none, scale-down.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "object-fit: cover | contain | fill | none | scale-down",
    mdnPath: "object-fit",
    demo: createObjectFitDemo()
  },
  {
    name: "object-position",
    category: "Layout",
    description: "Specifies the alignment of the replaced element inside its box when object-fit does not use the default fill value.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "object-position: center | top left | 50% 100% | 20px 80%",
    mdnPath: "object-position",
    demo: createObjectPositionDemo()
  },
  {
    name: "visibility",
    category: "Layout",
    description: "Controls whether an element is visible — unlike display:none, it still takes up space in the layout.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "visibility: visible | hidden | collapse",
    mdnPath: "visibility",
    demo: `<div style="display:flex;flex-direction:column;gap:4px;padding:6px">
      <div style="display:flex;align-items:center;gap:6px">
        <div style="width:60px;height:30px;background:#6366f1;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:9px;font-weight:700">visible</div>
        <span style="font-size:10px;color:#6366f1;font-weight:700">← element visible</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <div style="width:60px;height:30px;background:#e0e7ff;border:2px dashed #6366f1;border-radius:4px;visibility:hidden"></div>
        <span style="font-size:10px;color:#8b5cf6;font-weight:700">← hidden (space reserved)</span>
      </div>
    </div>`
  },
  {
    name: "anchor-name",
    category: "Layout",
    description: "Defines an element as an anchor that other elements can position themselves relative to. Chrome 125+ only.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: "anchor-name: --my-anchor",
    mdnPath: "anchor-name",
    demo: createAnchorNameDemo()
  },
  {
    name: "position-anchor",
    category: "Layout",
    description: "Links a positioned element to an anchor element by referencing its anchor-name. Chrome 125+ only.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: "position-anchor: --my-anchor",
    mdnPath: "position-anchor",
    demo: createPositionAnchorDemo()
  },
  {
    name: "position-area",
    category: "Layout",
    description: "Specifies which area of the anchor the element should position itself in — start, end, center, span-all.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: "position-area: top | bottom right | start center",
    mdnPath: "position-area",
    demo: createPositionAreaDemo()
  },
  {
    name: "position-try",
    category: "Layout",
    description: "Defines fallback positions when the preferred position would overflow the viewport — flip, inset, or custom.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: "position-try: flip-block | flip-inline | --custom-fallback",
    mdnPath: "position-try",
    demo: createPositionTryDemo()
  },
  {
    name: "top",
    category: "Layout",
    description: "Positions the top edge of a positioned element relative to its containing block.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "top: 0 | 1rem | auto",
    mdnPath: "top",
    demo: `<div style="padding:10px;position:relative;width:160px;height:70px;background:#e0e7ff;border-radius:6px;border:2px dashed #6366f1">
      <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700">top: 8px</div>
    </div>`
  },
  {
    name: "right",
    category: "Layout",
    description: "Positions the right edge of a positioned element relative to its containing block.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "right: 0 | 1rem | auto",
    mdnPath: "right",
    demo: `<div style="padding:10px;position:relative;width:160px;height:70px;background:#e0e7ff;border-radius:6px;border:2px dashed #6366f1">
      <div style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700">right</div>
    </div>`
  },
  {
    name: "bottom",
    category: "Layout",
    description: "Positions the bottom edge of a positioned element relative to its containing block.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "bottom: 0 | 1rem | auto",
    mdnPath: "bottom",
    demo: `<div style="padding:10px;position:relative;width:160px;height:70px;background:#e0e7ff;border-radius:6px;border:2px dashed #6366f1">
      <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700">bottom</div>
    </div>`
  },
  {
    name: "left",
    category: "Layout",
    description: "Positions the left edge of a positioned element relative to its containing block.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "left: 0 | 1rem | auto",
    mdnPath: "left",
    demo: `<div style="padding:10px;position:relative;width:160px;height:70px;background:#e0e7ff;border-radius:6px;border:2px dashed #6366f1">
      <div style="position:absolute;left:8px;top:50%;transform:translateY(-50%);background:#6366f1;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:700">left</div>
    </div>`
  },
  {
    name: "resize",
    category: "Layout",
    description: "Controls whether an element can be resized by the user — horizontally, vertically, both, or none.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "resize: none | both | horizontal | vertical",
    mdnPath: "resize",
    demo: `<div style="padding:10px">
      <div style="resize:both;overflow:auto;background:#6366f1;color:#fff;border-radius:5px;padding:8px;font-size:9px;font-weight:700;width:80px;height:40px">resize me</div>
    </div>`
  },
  {
    name: "vertical-align",
    category: "Layout",
    description: "Controls vertical alignment of inline or table-cell elements — baseline, middle, top, bottom, sub, super, etc.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "vertical-align: baseline | middle | top | bottom",
    mdnPath: "vertical-align",
    demo: `<div style="padding:10px;line-height:40px;background:#e0e7ff;border-radius:5px;font-size:20px;font-weight:700;color:#6366f1">
      <span style="vertical-align:baseline;font-size:14px">baseline</span>
      <span style="vertical-align:super;font-size:14px">super</span>
      <span style="vertical-align:sub;font-size:14px">sub</span>
      <span style="vertical-align:middle;font-size:14px">middle</span>
    </div>`
  }
];

// src/data/flexbox.ts
function createFlexboxItems() {
  return `
    <div style="flex:1;background:#8b5cf6;color:#fff;padding:10px 4px;border-radius:5px;font-size:10px;font-weight:700;text-align:center">flex: 1</div>
    <div style="flex:2;background:#6366f1;color:#fff;padding:10px 4px;border-radius:5px;font-size:10px;font-weight:700;text-align:center">flex: 2</div>
    <div style="flex:1;background:#8b5cf6;color:#fff;padding:10px 4px;border-radius:5px;font-size:10px;font-weight:700;text-align:center">flex: 1</div>
  `;
}
function createFlexDirectionDemo() {
  return `
    <div style="display:flex;gap:12px">
      <div style="display:flex;flex-direction:row;gap:4px;align-items:center">
        <div style="background:#8b5cf6;color:#fff;width:30px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">1</div>
        <div style="background:#8b5cf6;color:#fff;width:30px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">2</div>
        <div style="background:#8b5cf6;color:#fff;width:30px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">3</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="background:#6366f1;color:#fff;width:30px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">1</div>
        <div style="background:#6366f1;color:#fff;width:30px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">2</div>
        <div style="background:#6366f1;color:#fff;width:30px;height:18px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">3</div>
      </div>
    </div>
  `;
}
function createFlexWrapItems() {
  return [1, 2, 3, 4, 5].map((i) => `<div style="background:#8b5cf6;color:#fff;width:46px;padding:6px 0;border-radius:3px;font-size:10px;font-weight:700;text-align:center">${i}</div>`).join("");
}
function createJustifyContentDemo() {
  const smallItems = [1, 2, 3].map(() => `<div style="background:#8b5cf6;width:28px;height:20px;border-radius:3px"></div>`).join("");
  const smallItems2 = [1, 2, 3].map(() => `<div style="background:#6366f1;width:28px;height:20px;border-radius:3px"></div>`).join("");
  return `
    <div style="display:flex;flex-direction:column;gap:5px;padding:8px;width:100%">
      <div style="display:flex;justify-content:space-between;background:#f5f3ff;border-radius:4px;padding:4px">${smallItems}</div>
      <div style="display:flex;justify-content:center;gap:6px;background:#f5f3ff;border-radius:4px;padding:4px">${smallItems2}</div>
      <div style="font-size:9px;color:#888;font-weight:700;text-align:center">space-between · center</div>
    </div>
  `;
}
function createAlignItemsDemo() {
  return `
    <div style="display:flex;gap:8px;align-items:flex-end;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;padding:8px;height:72px">
      <div style="background:#8b5cf6;width:28px;height:50px;border-radius:3px"></div>
      <div style="background:#6366f1;width:28px;height:30px;border-radius:3px"></div>
      <div style="background:#a78bfa;width:28px;height:40px;border-radius:3px"></div>
      <div style="font-size:9px;color:#8b5cf6;font-weight:700;align-self:flex-end">align-items:<br>flex-end</div>
    </div>
  `;
}
function createAlignSelfDemo() {
  return `
    <div style="display:flex;align-items:flex-start;gap:6px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px;padding:8px;height:72px">
      <div style="background:#e0e7ff;width:28px;height:28px;border-radius:3px"></div>
      <div style="background:#8b5cf6;width:28px;height:28px;border-radius:3px;align-self:center;outline:2px dashed #f97316;outline-offset:2px"></div>
      <div style="background:#e0e7ff;width:28px;height:28px;border-radius:3px"></div>
      <div style="font-size:9px;color:#f97316;font-weight:700;align-self:center">← center</div>
    </div>
  `;
}
function createGapDemo() {
  const items = [1, 2, 3, 4].map(() => `<div style="background:#8b5cf6;width:28px;height:36px;border-radius:4px;position:relative"></div>`).join("");
  const separators = [1, 2, 3].map(() => `<div style="width:1px;height:24px;background:#8b5cf6;opacity:.3;border:1px dashed #8b5cf6"></div>`).join("");
  return `
    <div style="display:flex;gap:16px;align-items:center">
      ${items}
      ${separators}
    </div>
  `;
}
function createOrderDemo() {
  return `
    <div style="display:flex;gap:6px">
      <div style="background:#a78bfa;color:#fff;width:36px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:9px;font-weight:700">
        <span>3rd</span><span style="opacity:.6">ord:3</span>
      </div>
      <div style="background:#6366f1;color:#fff;width:36px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:9px;font-weight:700;outline:2px solid #f97316;outline-offset:2px">
        <span>1st</span><span style="opacity:.6">ord:-1</span>
      </div>
      <div style="background:#8b5cf6;color:#fff;width:36px;height:40px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-size:9px;font-weight:700">
        <span>2nd</span><span style="opacity:.6">ord:0</span>
      </div>
    </div>
  `;
}
function createFlexBasisDemo() {
  return `
    <div style="display:flex;gap:4px;padding:10px">
      <div style="flex-basis:40px;background:#8b5cf6;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">40px</div>
      <div style="flex-basis:80px;background:#6366f1;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">80px</div>
    </div>
  `;
}
function createFlexGrowDemo() {
  return `
    <div style="display:flex;gap:4px;padding:10px">
      <div style="flex-grow:1;background:#8b5cf6;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">1</div>
      <div style="flex-grow:2;background:#6366f1;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">2</div>
    </div>
  `;
}
function createFlexShrinkDemo() {
  return `
    <div style="display:flex;gap:4px;width:140px;padding:10px">
      <div style="flex-shrink:0;width:70px;background:#8b5cf6;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">no shrink</div>
      <div style="flex-shrink:1;width:90px;background:#6366f1;color:#fff;padding:6px;border-radius:4px;font-size:9px;font-weight:700">shrink</div>
    </div>
  `;
}
function createJustifyItemsDemo() {
  return `
    <div style="display:grid;justify-items:center;grid-template-columns:repeat(3,1fr);gap:4px;padding:10px">
      <div style="width:24px;background:#7c3aed;height:18px;border-radius:3px"></div>
      <div style="width:24px;background:#6366f1;height:18px;border-radius:3px"></div>
      <div style="width:24px;background:#8b5cf6;height:18px;border-radius:3px"></div>
    </div>
  `;
}
function createJustifySelfDemo() {
  return `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:10px">
      <div style="justify-self:start;background:#7c3aed;color:#fff;padding:6px;border-radius:3px;font-size:8px">start</div>
      <div style="justify-self:center;background:#6366f1;color:#fff;padding:6px;border-radius:3px;font-size:8px">center</div>
      <div style="justify-self:end;background:#8b5cf6;color:#fff;padding:6px;border-radius:3px;font-size:8px">end</div>
    </div>
  `;
}
var flexbox = [
  {
    name: "flex",
    category: "Flexbox",
    description: "Shorthand for flex-grow, flex-shrink, and flex-basis — how items grow, shrink, and size.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex: 1 | 0 1 auto | none | 2 1 300px",
    mdnPath: "flex",
    caniuse: "flexbox",
    default: "0 1 auto",
    demo: `<div style="display:flex;gap:6px;padding:10px;width:100%">${createFlexboxItems()}</div>`
  },
  {
    name: "flex-direction",
    category: "Flexbox",
    description: "Sets the main axis direction of a flex container — row (horizontal) or column (vertical).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-direction: row | row-reverse | column | column-reverse",
    mdnPath: "flex-direction",
    caniuse: "flexbox",
    default: "row",
    values: [
      {
        value: "row",
        label: "Row",
        description: "Items are laid out in the same direction as the text (left to right in LTR languages). This is the default."
      },
      {
        value: "row-reverse",
        label: "Row Reverse",
        description: "Items are laid out in the opposite direction to the text (right to left in LTR)."
      },
      {
        value: "column",
        label: "Column",
        description: "Items are laid out from top to bottom, forming a vertical stack."
      },
      {
        value: "column-reverse",
        label: "Column Reverse",
        description: "Items are laid out from bottom to top, forming an inverted vertical stack."
      }
    ],
    demo: createFlexDirectionDemo()
  },
  {
    name: "flex-wrap",
    category: "Flexbox",
    description: "Controls whether flex items wrap onto multiple lines when they overflow the container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-wrap: nowrap | wrap | wrap-reverse",
    mdnPath: "flex-wrap",
    caniuse: "flexbox",
    default: "nowrap",
    values: [
      {
        value: "nowrap",
        label: "No Wrap",
        description: "Items are forced onto a single line and will shrink to fit if necessary. This is the default."
      },
      {
        value: "wrap",
        label: "Wrap",
        description: "Items wrap onto multiple lines from top to bottom if they don't fit on one line."
      },
      {
        value: "wrap-reverse",
        label: "Wrap Reverse",
        description: "Items wrap onto multiple lines from bottom to top, reversing the visual order of lines."
      }
    ],
    demo: `<div style="display:flex;flex-wrap:wrap;gap:5px;padding:8px;width:180px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:6px">${createFlexWrapItems()}</div>`
  },
  {
    name: "justify-content",
    category: "Flexbox",
    description: "Aligns flex/grid items along the main axis with distribution control.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "justify-content: flex-start | center | space-between | space-around | space-evenly",
    mdnPath: "justify-content",
    caniuse: "flexbox",
    default: "flex-start",
    values: [
      {
        value: "flex-start",
        label: "Flex Start",
        description: "Items are packed toward the start of the main axis. In a row layout, they align to the left."
      },
      {
        value: "flex-end",
        label: "Flex End",
        description: "Items are packed toward the end of the main axis. In a row layout, they align to the right."
      },
      {
        value: "center",
        label: "Center",
        description: "Items are centered along the main axis with equal space on both sides."
      },
      {
        value: "space-between",
        label: "Space Between",
        description: "Items are distributed with the first item at the start and last item at the end. Remaining space is distributed evenly between items."
      },
      {
        value: "space-around",
        label: "Space Around",
        description: "Items are distributed with equal space around each item. This means the first and last items have half the spacing of the space between adjacent items."
      },
      {
        value: "space-evenly",
        label: "Space Evenly",
        description: "Items are distributed so that the spacing between any two adjacent items (and the edges) is exactly the same."
      }
    ],
    demo: createJustifyContentDemo()
  },
  {
    name: "align-items",
    category: "Flexbox",
    description: "Aligns flex/grid items along the cross axis of their container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "align-items: stretch | flex-start | flex-end | center | baseline",
    mdnPath: "align-items",
    caniuse: "flexbox",
    default: "stretch",
    values: [
      {
        value: "stretch",
        label: "Stretch",
        description: "Items are stretched to fill the container along the cross axis. This is the default value."
      },
      {
        value: "flex-start",
        label: "Flex Start",
        description: "Items are aligned at the start of the cross axis. In a row layout, they align to the top."
      },
      {
        value: "flex-end",
        label: "Flex End",
        description: "Items are aligned at the end of the cross axis. In a row layout, they align to the bottom."
      },
      {
        value: "center",
        label: "Center",
        description: "Items are centered along the cross axis, with equal space above and below."
      },
      {
        value: "baseline",
        label: "Baseline",
        description: "Items are aligned so their baselines align. The baseline is the invisible line where text sits."
      }
    ],
    demo: createAlignItemsDemo()
  },
  {
    name: "align-self",
    category: "Flexbox",
    description: "Overrides the container's align-items for a specific flex/grid item.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "align-self: auto | stretch | flex-start | flex-end | center",
    mdnPath: "align-self",
    caniuse: "flexbox",
    values: [
      {
        value: "auto",
        label: "Auto",
        description: "The item inherits the align-items value from the container. This is the default."
      },
      {
        value: "stretch",
        label: "Stretch",
        description: "The item stretches to fill the container along the cross axis."
      },
      {
        value: "flex-start",
        label: "Flex Start",
        description: "The item is aligned at the start of the cross axis, overriding the container's align-items."
      },
      {
        value: "flex-end",
        label: "Flex End",
        description: "The item is aligned at the end of the cross axis, overriding the container's align-items."
      },
      {
        value: "center",
        label: "Center",
        description: "The item is centered along the cross axis, overriding the container's align-items."
      },
      {
        value: "baseline",
        label: "Baseline",
        description: "The item is aligned to the text baseline, overriding the container's align-items."
      }
    ],
    demo: createAlignSelfDemo()
  },
  {
    name: "gap",
    category: "Flexbox",
    description: "Sets the gap between flex and grid items — shorthand for row-gap and column-gap.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "gap: 1rem | 0.5rem 1.5rem",
    mdnPath: "gap",
    caniuse: "flexbox",
    demo: createGapDemo()
  },
  {
    name: "order",
    category: "Flexbox",
    description: "Controls the visual order in which a flex/grid item appears inside its container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "order: 0 | -1 | 3",
    mdnPath: "order",
    caniuse: "flexbox",
    values: [
      {
        value: "0",
        label: "Default (0)",
        description: "Items appear in their source order. The default order is 0, meaning items with order: 0 appear before items with positive order and after items with negative order."
      },
      {
        value: "positive",
        label: "Positive Number",
        description: "Items with positive order values appear after items with order: 0. Higher numbers appear further toward the end."
      },
      {
        value: "negative",
        label: "Negative Number",
        description: "Items with negative order values appear before items with order: 0. More negative values appear further toward the start."
      }
    ],
    demo: createOrderDemo()
  },
  {
    name: "flex-basis",
    category: "Flexbox",
    description: "Sets the initial main size of a flex item — the size before free space is distributed.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-basis: auto | 200px | 30%",
    mdnPath: "flex-basis",
    caniuse: "flexbox",
    values: [
      {
        value: "auto",
        label: "Auto",
        description: "The item's size is based on its content or explicit width/height. This is the default."
      },
      {
        value: "0",
        label: "Zero",
        description: "The item has zero size before growing/shrinking calculations. All available space goes to growth/shrink."
      },
      {
        value: "px/rem/%",
        label: "Fixed Size",
        description: "The item starts at the specified size before growth/shrink calculations are applied."
      }
    ],
    demo: createFlexBasisDemo()
  },
  {
    name: "flex-grow",
    category: "Flexbox",
    description: "Controls how much a flex item grows relative to others when positive space is distributed.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-grow: 0 | 1 | 2",
    mdnPath: "flex-grow",
    caniuse: "flexbox",
    values: [
      {
        value: "0",
        label: "No Growth (0)",
        description: "The item will not grow even when there's available space. It only takes up its natural size."
      },
      {
        value: "1",
        label: "Grow Factor 1",
        description: "The item will grow to fill any available space. When all items have flex-grow: 1, they share space equally."
      },
      {
        value: "2+",
        label: "Proportional Growth",
        description: "The growth is relative to other items. If one item has flex-grow: 2 and another has flex-grow: 1, the first gets twice as much of the available space."
      }
    ],
    demo: createFlexGrowDemo()
  },
  {
    name: "flex-shrink",
    category: "Flexbox",
    description: "Controls how much a flex item shrinks relative to others when negative space is distributed.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "flex-shrink: 0 | 1 | 2",
    mdnPath: "flex-shrink",
    caniuse: "flexbox",
    values: [
      {
        value: "1",
        label: "Shrink (1)",
        description: "The item will shrink when needed to fit in the container. This is the default behavior."
      },
      {
        value: "0",
        label: "No Shrink",
        description: "The item will not shrink below its flex-basis value, even if it causes overflow. Use this to preserve an item's minimum size."
      },
      {
        value: "2+",
        label: "Proportional Shrink",
        description: "Higher values mean the item shrinks more relative to siblings with lower values."
      }
    ],
    demo: createFlexShrinkDemo()
  },
  {
    name: "justify-items",
    category: "Flexbox",
    description: "Aligns items on the inline axis within their grid area — applies to grid containers.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "justify-items: start | center | end | stretch",
    mdnPath: "justify-items",
    caniuse: "flexbox",
    demo: createJustifyItemsDemo()
  },
  {
    name: "justify-self",
    category: "Flexbox",
    description: "Aligns a single item on the inline axis within its grid area — overrides justify-items.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "justify-self: auto | start | center | end",
    mdnPath: "justify-self",
    caniuse: "flexbox",
    demo: createJustifySelfDemo()
  }
];

// src/data/grid.ts
function createGridTemplateColumnsDemo() {
  const items = [1, 2, 3];
  const colors = ["#7c3aed", "#6366f1", "#7c3aed"];
  const labels = ["1fr", "2fr", "1fr"];
  const gridItems = items.map((_, i) => `<div style="background:${colors[i]};color:#fff;padding:8px 4px;border-radius:4px;font-size:10px;font-weight:700;text-align:center">${labels[i]}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:1fr 2fr 1fr;gap:5px;padding:10px;width:100%">${gridItems}</div>`;
}
function createGridTemplateRowsDemo() {
  const rows = [
    { label: "24px", color: "#7c3aed" },
    { label: "40px (tall)", color: "#6366f1" },
    { label: "16px", color: "#a78bfa" }
  ];
  const cells = rows.map((r) => `<div style="background:${r.color};color:#fff;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${r.label}</div>`).join("");
  return `<div style="display:grid;grid-template-rows:24px 40px 16px;gap:4px;padding:8px;width:100%">${cells}</div>`;
}
function createGridTemplateAreasDemo() {
  const areas = [
    { name: "header", area: "h", color: "#7c3aed" },
    { name: "sidebar", area: "s", color: "#8b5cf6" },
    { name: "main", area: "m", color: "#6366f1" },
    { name: "footer", area: "f", color: "#a78bfa" }
  ];
  const cells = areas.map((a) => `<div style="grid-area:${a.area};background:${a.color};color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">${a.name}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:60px 1fr;grid-template-rows:22px 36px 18px;gap:3px;padding:8px;width:100%;grid-template-areas:'h h' 's m' 'f f'">${cells}</div>`;
}
function createGridColumnDemo() {
  const items = [
    {
      style: "grid-column:1/-1",
      label: "1 / -1 (full width)",
      color: "#7c3aed"
    },
    { style: "", label: "1", color: "#a78bfa" },
    { style: "grid-column:span 2", label: "span 2", color: "#6366f1" }
  ];
  const cells = items.map((item) => `<div style="${item.style};background:${item.color};color:#fff;padding:6px;border-radius:3px;font-size:10px;font-weight:700;text-align:center">${item.label}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:8px;width:100%">${cells}</div>`;
}
function createGridRowDemo() {
  const items = [
    { style: "grid-row:span 2", label: "span 2", color: "#7c3aed" },
    { style: "", label: "row 1", color: "#a78bfa" },
    { style: "", label: "row 2", color: "#6366f1" }
  ];
  const cells = items.map((item) => `<div style="${item.style};background:${item.color};color:#fff;border-radius:3px;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">${item.label}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:60px 1fr;grid-template-rows:repeat(2,30px);gap:4px;padding:8px;width:100%">${cells}</div>`;
}
function createGridAutoFlowDemo() {
  const items = [
    { style: "grid-column:span 2", label: "span 2", color: "#7c3aed" },
    { style: "", label: "auto", color: "#a78bfa" },
    { style: "", label: "auto", color: "#6366f1" },
    { style: "", label: "auto", color: "#a78bfa" }
  ];
  const cells = items.map((item) => `<div style="${item.style};background:${item.color};color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">${item.label}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-flow:dense;gap:4px;padding:8px;width:100%">${cells}</div>`;
}
function createSubgridDemo() {
  const cells = [1, 2, 3].map((n) => `<div style="background:${["#7c3aed", "#6366f1", "#8b5cf6"][n - 1]};color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">${["inherits", "parent", "tracks"][n - 1]}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:8px;width:100%"><div style="grid-column:1/-1;display:grid;grid-template-columns:subgrid;gap:4px;background:#f5f3ff;border:2px dashed #7c3aed;border-radius:4px;padding:4px">${cells}</div></div>`;
}
function createMinmaxDemo() {
  const items = [
    { label: "minmax(70px,1fr)", color: "#7c3aed" },
    { label: "minmax(100px,2fr)", color: "#6366f1" }
  ];
  const cells = items.map((item) => `<div style="background:${item.color};color:#fff;border-radius:3px;padding:7px;font-size:9px;font-weight:700;text-align:center">${item.label}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:minmax(70px,1fr) minmax(100px,2fr);gap:4px;padding:8px;width:100%">${cells}</div>`;
}
function createRepeatDemo() {
  const nums = [1, 2, 3, 4];
  const cells = nums.map((n) => `<div style="background:#8b5cf6;color:#fff;border-radius:3px;padding:6px;font-size:9px;font-weight:700;text-align:center">${n}</div>`).join("");
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px;width:100%">${cells}</div>`;
}
function createGridAreaDemo() {
  const areas = [
    { area: "a", label: "area a", color: "#6366f1" },
    { area: "b", label: "area b", color: "#8b5cf6" },
    { area: "c", label: "area c", color: "#a78bfa" }
  ];
  const cells = areas.map((a) => `<div style="grid-area:${a.area};background:${a.color};color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">${a.label}</div>`).join("");
  return `<div style="padding:10px"><div style="display:grid;grid-template-columns:1fr 1fr;grid-template-areas:'a b' 'c c';gap:4px;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px">${cells}</div></div>`;
}
function createGridAutoColumnsDemo() {
  const items = [
    { label: "1", color: "#6366f1" },
    { label: "2", color: "#8b5cf6" },
    { label: "3", color: "#a78bfa" }
  ];
  const cells = items.map((item) => `<div style="background:${item.color};color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">${item.label}</div>`).join("");
  return `<div style="padding:10px"><div style="display:grid;grid-auto-flow:column;grid-auto-columns:60px;gap:4px;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px">${cells}</div></div>`;
}
function createGridAutoRowsDemo() {
  const items = [
    { label: "1", color: "#6366f1" },
    { label: "2", color: "#8b5cf6" }
  ];
  const cells = items.map((item) => `<div style="background:${item.color};color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">${item.label}</div>`).join("");
  return `<div style="padding:10px"><div style="display:grid;grid-auto-rows:30px;gap:4px;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px">${cells}</div></div>`;
}
var grid = [
  {
    name: "grid-template-columns",
    category: "Grid",
    description: "Defines the column track sizes of a grid, supporting fixed, flexible, and repeat() patterns.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-columns: repeat(3, 1fr) | 200px 1fr | minmax(0, 1fr)",
    mdnPath: "grid-template-columns",
    caniuse: "css-grid",
    default: "none",
    demo: createGridTemplateColumnsDemo(),
    values: [
      {
        value: "fr",
        label: "Fractional Unit (fr)",
        description: "Represents a fraction of available space. 1fr 2fr means the second column gets twice as much space as the first."
      },
      {
        value: "px",
        label: "Pixels",
        description: "Fixed width columns in pixels. Use for precise control over column sizes."
      },
      {
        value: "auto",
        label: "Auto",
        description: "Columns size based on content. Takes up remaining space after fixed sizes are allocated."
      },
      {
        value: "repeat()",
        label: "Repeat Function",
        description: "Shorthand to repeat track patterns. repeat(3, 1fr) creates three equal columns."
      },
      {
        value: "minmax()",
        label: "MinMax Function",
        description: "Creates tracks with minimum and maximum sizes. minmax(100px, 1fr) won't shrink below 100px but can grow."
      }
    ]
  },
  {
    name: "grid-template-rows",
    category: "Grid",
    description: "Defines the row track sizes of a grid container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-rows: auto | 100px 1fr | repeat(4, minmax(0, auto))",
    mdnPath: "grid-template-rows",
    caniuse: "css-grid",
    default: "none",
    demo: createGridTemplateRowsDemo(),
    values: [
      {
        value: "auto",
        label: "Auto",
        description: "Rows size based on content. Takes up remaining space after explicit sizes."
      },
      {
        value: "px",
        label: "Pixels",
        description: "Fixed height rows in pixels. Use when you need precise row heights."
      },
      {
        value: "fr",
        label: "Fractional Unit",
        description: "Rows size as fraction of available space."
      },
      {
        value: "repeat()",
        label: "Repeat Function",
        description: "Repeats row patterns. Useful for creating consistent row heights."
      },
      {
        value: "minmax()",
        label: "MinMax Function",
        description: "Creates rows with min/max constraints for responsive behavior."
      }
    ]
  },
  {
    name: "grid-template-areas",
    category: "Grid",
    description: "Defines named grid areas using an ASCII-art string — a powerful visual layout technique.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: `grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer"`,
    mdnPath: "grid-template-areas",
    caniuse: "css-grid",
    demo: createGridTemplateAreasDemo(),
    values: [
      {
        value: '"name"',
        label: "Named Area",
        description: "Define a named area that can be assigned to any grid item using grid-area."
      },
      {
        value: '"a a"',
        label: "Spanning",
        description: "Use the same name twice to make an item span multiple cells."
      },
      {
        value: '". ."',
        label: "Empty Cell",
        description: "Use a dot (.) to create empty cells in the grid."
      }
    ]
  },
  {
    name: "grid-column",
    category: "Grid",
    description: "Shorthand for grid-column-start and grid-column-end — places an item across columns.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-column: 1 / 3 | span 2 | 1 / -1",
    mdnPath: "grid-column",
    caniuse: "css-grid",
    demo: createGridColumnDemo(),
    values: [
      {
        value: "1",
        label: "Line Number",
        description: "Places item at specific line. grid-column: 1 places it at the first line."
      },
      {
        value: "1 / 3",
        label: "Span Lines",
        description: "Start at line 1 and end at line 3. Creates an item spanning multiple tracks."
      },
      {
        value: "span 2",
        label: "Span Keyword",
        description: "Span 2 means the item takes up 2 tracks. Works with both column and row."
      },
      {
        value: "-1",
        label: "Negative Line",
        description: "References the last line. -1 always points to the end regardless of track count."
      }
    ]
  },
  {
    name: "grid-row",
    category: "Grid",
    description: "Shorthand for grid-row-start and grid-row-end — places an item across rows.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-row: 1 / 3 | span 2",
    mdnPath: "grid-row",
    caniuse: "css-grid",
    demo: createGridRowDemo(),
    values: [
      {
        value: "1",
        label: "Line Number",
        description: "Places item at specific line. grid-column: 1 places it at the first line."
      },
      {
        value: "1 / 3",
        label: "Span Lines",
        description: "Start at line 1 and end at line 3. Creates an item spanning multiple tracks."
      },
      {
        value: "span 2",
        label: "Span Keyword",
        description: "Span 2 means the item takes up 2 tracks. Works with both column and row."
      },
      {
        value: "-1",
        label: "Negative Line",
        description: "References the last line. -1 always points to the end regardless of track count."
      }
    ]
  },
  {
    name: "grid-auto-flow",
    category: "Grid",
    description: "Controls how the browser places auto-placed grid items — row-first, column-first, or dense packing.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-auto-flow: row | column | dense | row dense",
    mdnPath: "grid-auto-flow",
    caniuse: "css-grid",
    demo: createGridAutoFlowDemo(),
    values: [
      {
        value: "row",
        label: "Row",
        description: "Items fill row by row, moving to a new row when the current row is full. This is the default."
      },
      {
        value: "column",
        label: "Column",
        description: "Items fill column by column, moving to a new column when the current column is full."
      },
      {
        value: "dense",
        label: "Dense",
        description: "Attempts to fill holes in the grid by placing smaller items in available gaps. May change visual order."
      }
    ]
  },
  {
    name: "subgrid",
    category: "Grid",
    description: "Lets a nested grid inherit its parent's track sizing — eliminates the need for hacky workarounds.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: `grid-template-columns: subgrid
grid-template-rows: subgrid`,
    mdnPath: "CSS_grid_layout/Subgrid",
    caniuse: "css-grid",
    demo: createSubgridDemo(),
    values: [
      {
        value: "subgrid",
        label: "Subgrid",
        description: "Inherits the track sizing from the parent grid. Children can align with grandparent items."
      }
    ]
  },
  {
    name: "minmax()",
    category: "Grid",
    description: "Defines a grid track size with a minimum and maximum constraint.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-columns: minmax(80px, 1fr) 2fr",
    mdnPath: "minmax",
    caniuse: "css-grid",
    demo: createMinmaxDemo()
  },
  {
    name: "repeat()",
    category: "Grid",
    description: "Repeats track definitions to build concise, scalable grid templates.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-template-columns: repeat(4, 1fr)",
    mdnPath: "repeat",
    caniuse: "css-grid",
    demo: createRepeatDemo()
  },
  {
    name: "grid-area",
    category: "Grid",
    description: "Shorthand for grid-row-start, grid-column-start, grid-row-end, grid-column-end — places items by area name or line numbers.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-area: header | 1 / 2 / 3 / 4",
    mdnPath: "grid-area",
    caniuse: "css-grid",
    demo: createGridAreaDemo()
  },
  {
    name: "grid-auto-columns",
    category: "Grid",
    description: "Specifies the size of implicitly-created grid columns — for items placed outside defined tracks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-auto-columns: 120px | minmax(100px,1fr)",
    mdnPath: "grid-auto-columns",
    caniuse: "css-grid",
    demo: createGridAutoColumnsDemo()
  },
  {
    name: "grid-auto-rows",
    category: "Grid",
    description: "Specifies the size of implicitly-created grid rows — for items placed outside defined tracks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "grid-auto-rows: 80px | minmax(60px,auto)",
    mdnPath: "grid-auto-rows",
    caniuse: "css-grid",
    demo: createGridAutoRowsDemo()
  }
];

// src/data/typography.ts
var fontSizeWeights = [100, 300, 400, 700, 900];
var fontSizeSizes = {
  sm: "10px",
  md: "16px",
  lg: "24px",
  xl: "34px"
};
var fontSizeLabels = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl"
};
function createFontSizeDemo() {
  return `<div style="display:flex;align-items:baseline;gap:10px;padding:8px">` + Object.entries(fontSizeSizes).map(([size, fontSize]) => `<span style="font-size:${fontSize};font-weight:700;color:#ec4899">${fontSizeLabels[size]}</span>`).join("") + `</div>`;
}
function createFontFamilyDemo() {
  return `<div style="display:flex;flex-direction:column;gap:5px;padding:8px">` + `<p style="font-family:system-ui;font-size:16px;font-weight:700;color:#ec4899">Aa — system-ui sans-serif</p>` + `<p style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#db2777">Aa — Georgia, serif</p>` + `<p style="font-family:ui-monospace,monospace;font-size:14px;font-weight:700;color:#be185d">Aa — monospace</p>` + `</div>`;
}
function createFontWeightDemo() {
  return `<div style="display:flex;align-items:baseline;gap:8px;padding:8px">` + fontSizeWeights.map((w) => `<span style="font-weight:${w};font-size:${10 + w / 110}px;color:#ec4899">${w}</span>`).join("") + `</div>`;
}
function createLineHeightDemo() {
  return `<div style="display:flex;gap:12px;padding:6px">` + `<div style="width:90px"><p style="line-height:1;font-size:10px;font-weight:700;color:#ec4899;background:#fdf2f8;padding:4px;border-radius:3px">Tight line height 1.0 makes text very compact</p></div>` + `<div style="width:90px"><p style="line-height:1.8;font-size:10px;font-weight:700;color:#db2777;background:#fdf2f8;padding:4px;border-radius:3px">Loose 1.8 gives breathing room</p></div>` + `</div>`;
}
function createLetterSpacingDemo() {
  return `<div style="display:flex;flex-direction:column;gap:5px;padding:10px">` + `<p style="letter-spacing:-.04em;font-size:15px;font-weight:800;color:#ec4899">Tight tracking</p>` + `<p style="letter-spacing:.08em;font-size:13px;font-weight:700;color:#db2777;text-transform:uppercase">Wide spacing</p>` + `</div>`;
}
function createTextWrapDemo() {
  return `<div style="display:flex;gap:10px;padding:8px;align-items:start">` + `<div style="width:90px"><p style="text-wrap:balance;font-size:10px;line-height:1.4;color:#ec4899;font-weight:700;background:#fdf2f8;padding:4px;border-radius:3px">text-wrap: balance keeps lines even</p></div>` + `<div style="width:90px"><p style="font-size:10px;line-height:1.4;color:#888;background:#f5f5f5;padding:4px;border-radius:3px">Normal wrap can leave short orphans at the end</p></div>` + `</div>`;
}
function createTextDecorationDemo() {
  return `<div style="display:flex;flex-direction:column;gap:6px;padding:10px">` + `<p style="text-decoration:underline;text-decoration-color:#6366f1;text-decoration-thickness:2px;font-size:13px;font-weight:700;color:#111">Underline</p>` + `<p style="text-decoration:line-through;text-decoration-color:#ec4899;font-size:13px;font-weight:700;color:#111">Line-through</p>` + `<p style="text-decoration:overline wavy #f97316;font-size:13px;font-weight:700;color:#111">Wavy overline</p>` + `</div>`;
}
function createClampDemo() {
  return `<div style="padding:10px;text-align:center">` + `<p style="font-size:clamp(12px,3vw,28px);font-weight:900;color:#ec4899;line-height:1.2">Fluid<br>Typography</p>` + `<p style="font-size:10px;color:#888;margin-top:4px;font-weight:700">clamp(12px, 3vw, 28px)</p>` + `</div>`;
}
function createFontOpticalSizingDemo() {
  return `<div style="display:flex;align-items:baseline;gap:12px;padding:10px">` + `<span style="font-optical-sizing:auto;font-size:32px;font-weight:900;color:#ec4899">Aa</span>` + `<span style="font-optical-sizing:none;font-size:32px;font-weight:900;color:#db2777">Aa</span>` + `<div style="font-size:9px;color:#888;font-weight:700">auto · none</div>` + `</div>`;
}
function createTextAlignDemo() {
  return `<div style="display:flex;flex-direction:column;gap:4px;padding:8px;width:180px">` + `<p style="text-align:left;font-size:10px;font-weight:700;color:#ec4899;background:#fdf2f8;padding:4px;border-radius:3px;margin:0">← Left aligned text</p>` + `<p style="text-align:center;font-size:10px;font-weight:700;color:#db2777;background:#fdf2f8;padding:4px;border-radius:3px;margin:0">Center →</p>` + `<p style="text-align:right;font-size:10px;font-weight:700;color:#be185d;background:#fdf2f8;padding:4px;border-radius:3px;margin:0">Right aligned →</p>` + `</div>`;
}
function createWhiteSpaceDemo() {
  return `<div style="display:flex;flex-direction:column;gap:4px;padding:8px">` + `<div style="width:140px;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px"><p style="white-space:nowrap;font-size:9px;font-weight:700;color:#6366f1;margin:0;overflow:hidden">nowrap: text won't wrap</p></div>` + `<div style="width:140px;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><p style="white-space:pre-wrap;font-size:9px;font-weight:700;color:#8b5cf6;margin:0">pre-wrap:  respects   spaces</p></div>` + `</div>`;
}
function createTextOverflowDemo() {
  return `<div style="display:flex;flex-direction:column;gap:6px;padding:8px">` + `<div style="width:140px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px"><span style="font-size:10px;font-weight:700;color:#6366f1">Long text with ellipsis truncation...</span></div>` + `<div style="width:140px;overflow:hidden;white-space:nowrap;text-overflow:clip;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><span style="font-size:10px;font-weight:700;color:#8b5cf6">Long text with clip truncat</span></div>` + `</div>`;
}
function createTextShadowDemo() {
  return `<div style="display:flex;flex-direction:column;gap:6px;padding:10px">` + `<p style="font-size:18px;font-weight:900;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,0.5);margin:0">Soft Shadow</p>` + `<p style="font-size:18px;font-weight:900;color:#ec4899;text-shadow:3px 3px 0 #be185d;margin:0">Hard Shadow</p>` + `<p style="font-size:16px;font-weight:900;color:#fff;text-shadow:0 0 8px #ec4899;margin:0">Glow Effect</p>` + `</div>`;
}
var typography = [
  {
    name: "font-size",
    category: "Typography",
    description: "Sets the font size — supports px, rem, em, %, and fluid functions like clamp().",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-size: 1rem | clamp(1rem, 0.5rem + 2vw, 2rem)",
    mdnPath: "font-size",
    demo: createFontSizeDemo(),
    values: [
      {
        value: "px",
        label: "Pixels",
        description: "Absolute size in pixels. Precise but not responsive to user preferences or viewport."
      },
      {
        value: "rem",
        label: "Root EM",
        description: "Relative to the root element's font-size. 1rem equals the user's default font size (usually 16px). Better for accessibility."
      },
      {
        value: "em",
        label: "EM",
        description: "Relative to parent element's font-size. Can compound when nested, so use with caution."
      },
      {
        value: "clamp()",
        label: "Clamp Function",
        description: "Creates fluid typography that scales with viewport. clamp(min, preferred, max) constrains between min and max."
      }
    ]
  },
  {
    name: "font-family",
    category: "Typography",
    description: "Specifies the typeface or ordered font stack to use.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'font-family: "Inter", system-ui, sans-serif',
    mdnPath: "font-family",
    demo: createFontFamilyDemo()
  },
  {
    name: "font-weight",
    category: "Typography",
    description: "Sets the weight (boldness) of the font, from 100 (thin) to 900 (black).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-weight: normal | bold | 400 | 700",
    mdnPath: "font-weight",
    demo: createFontWeightDemo(),
    values: [
      {
        value: "100",
        label: "Thin",
        description: "Extra light or thin appearance. Not available in all fonts."
      },
      {
        value: "300",
        label: "Light",
        description: "Light or thin weight. Good for large display text."
      },
      {
        value: "400",
        label: "Normal",
        description: "Regular or normal weight. The default for most text."
      },
      { value: "500", label: "Medium", description: "Medium weight. Slightly bolder than normal." },
      {
        value: "700",
        label: "Bold",
        description: "Bold weight. The most common weight for emphasized text."
      },
      {
        value: "900",
        label: "Black",
        description: "Black or extra bold. The heaviest available weight."
      }
    ]
  },
  {
    name: "line-height",
    category: "Typography",
    description: "Sets the height of a line box, controlling vertical spacing between lines of text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "line-height: normal | 1.5 | 1.6 | 24px",
    mdnPath: "line-height",
    demo: createLineHeightDemo(),
    values: [
      {
        value: "normal",
        label: "Normal",
        description: "Browser default, typically around 1.2-1.5 depending on the font."
      },
      {
        value: "number",
        label: "Unitless Number",
        description: "Multiplies the font size. line-height: 1.5 means text is 1.5x the font size tall. Recommended approach."
      },
      {
        value: "px",
        label: "Pixels",
        description: "Fixed line height in pixels. Less flexible than unitless values."
      },
      {
        value: "%",
        label: "Percentage",
        description: "Percentage of the font size. 150% equals unitless 1.5."
      }
    ]
  },
  {
    name: "letter-spacing",
    category: "Typography",
    description: "Sets horizontal spacing (tracking) between characters.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "letter-spacing: normal | 0.05em | -0.02em",
    mdnPath: "letter-spacing",
    demo: createLetterSpacingDemo()
  },
  {
    name: "text-wrap",
    category: "Typography",
    description: "Controls text wrapping — balance distributes evenly, pretty avoids orphans at paragraph ends.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2024",
    example: "text-wrap: wrap | nowrap | balance | pretty | stable",
    mdnPath: "text-wrap",
    demo: createTextWrapDemo(),
    values: [
      {
        value: "wrap",
        label: "Wrap",
        description: "Default wrapping behavior. May leave short lines at paragraph ends (orphans)."
      },
      {
        value: "nowrap",
        label: "No Wrap",
        description: "Prevents all wrapping. Text continues on a single line."
      },
      {
        value: "balance",
        label: "Balance",
        description: "Distributes line lengths more evenly within a heading or short paragraph. Best for short texts."
      },
      {
        value: "pretty",
        label: "Pretty",
        description: "Adjusts line breaks to avoid orphans at the end of paragraphs. Better for longer text blocks."
      }
    ]
  },
  {
    name: "text-decoration",
    category: "Typography",
    description: "Adds decorative lines to text — underline, overline, line-through, with style and colour control.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-decoration: underline | overline dashed red | line-through",
    mdnPath: "text-decoration",
    demo: createTextDecorationDemo(),
    values: [
      {
        value: "underline",
        label: "Underline",
        description: "Adds a line below the text. Often used for links."
      },
      {
        value: "overline",
        label: "Overline",
        description: "Adds a line above the text. Rarely used but available."
      },
      {
        value: "line-through",
        label: "Line Through",
        description: "Adds a line through the middle of text. Used to indicate deleted content."
      },
      {
        value: "wavy",
        label: "Wavy",
        description: "Style modifier that makes the line wavy instead of solid."
      },
      {
        value: "dashed",
        label: "Dashed",
        description: "Style modifier that makes the line dashed instead of solid."
      }
    ]
  },
  {
    name: "clamp()",
    category: "Typography",
    description: "Math function that constrains a value between a min and max with a fluid preferred value.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem)",
    mdnPath: "clamp",
    demo: createClampDemo()
  },
  {
    name: "font-optical-sizing",
    category: "Typography",
    description: "Allows font glyphs to be adjusted optically for different font sizes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "font-optical-sizing: auto | none",
    mdnPath: "font-optical-sizing",
    demo: createFontOpticalSizingDemo()
  },
  {
    name: "text-align",
    category: "Typography",
    description: "Sets the horizontal alignment of inline content — left, right, center, justify, or match-parent.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-align: left | right | center | justify | start | end",
    mdnPath: "text-align",
    demo: createTextAlignDemo(),
    values: [
      {
        value: "left",
        label: "Left",
        description: "Aligns text to the left edge. Default for LTR languages."
      },
      {
        value: "right",
        label: "Right",
        description: "Aligns text to the right edge. Default for RTL languages."
      },
      {
        value: "center",
        label: "Center",
        description: "Centers text horizontally within its container."
      },
      {
        value: "justify",
        label: "Justify",
        description: "Aligns text to both left and right edges by adjusting word spacing. Creates clean edges on both sides."
      },
      {
        value: "start",
        label: "Start",
        description: "Same as left in LTR, right in RTL. Adapts to text direction."
      },
      {
        value: "end",
        label: "End",
        description: "Same as right in LTR, left in RTL. Adapts to text direction."
      }
    ]
  },
  {
    name: "white-space",
    category: "Typography",
    description: "Controls how white space is handled and whether text wraps — nowrap, pre, pre-wrap, pre-line, break-spaces.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "white-space: normal | nowrap | pre | pre-wrap | pre-line",
    mdnPath: "white-space",
    demo: createWhiteSpaceDemo(),
    values: [
      {
        value: "normal",
        label: "Normal",
        description: "Whitespace is collapsed and text wraps. Default behavior."
      },
      {
        value: "nowrap",
        label: "No Wrap",
        description: "Prevents text from wrapping. All text appears on one line."
      },
      {
        value: "pre",
        label: "Preserve",
        description: "Preserves whitespace and line breaks exactly as in the source. Like <pre> tag."
      },
      {
        value: "pre-wrap",
        label: "Preserve & Wrap",
        description: "Preserves whitespace but wraps text when needed."
      },
      {
        value: "pre-line",
        label: "Preserve Lines",
        description: "Collapses whitespace but preserves line breaks from source."
      }
    ]
  },
  {
    name: "text-overflow",
    category: "Typography",
    description: "Controls how overflowed text is signaled — ellipsis, clip, or custom string (Firefox).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'text-overflow: clip | ellipsis | "…"',
    mdnPath: "text-overflow",
    demo: createTextOverflowDemo()
  },
  {
    name: "text-shadow",
    category: "Typography",
    description: "Adds shadow effects to text — accepts offset-x, offset-y, blur-radius, and color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-shadow: 2px 2px 4px rgba(0,0,0,0.5)",
    mdnPath: "text-shadow",
    demo: createTextShadowDemo()
  }
];

// src/data/color.ts
function createColorDemo() {
  return `<div style="padding:10px;display:flex;flex-direction:column;gap:4px">
    <p style="color:#6366f1;font-weight:800;font-size:13px">color: #6366f1</p>
    <p style="color:oklch(65% .25 10);font-weight:800;font-size:13px">color: oklch(65% .25 10)</p>
    <p style="color:hsl(200 90% 45%);font-weight:800;font-size:13px">color: hsl(200 90% 45%)</p>
  </div>`;
}
function createBackgroundDemo() {
  return `<div style="display:flex;gap:6px;padding:8px">
    <div style="flex:1;height:60px;background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700">linear</div>
    <div style="flex:1;height:60px;background:radial-gradient(circle,#f97316,#ec4899);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700">radial</div>
    <div style="flex:1;height:60px;background:conic-gradient(#6366f1,#ec4899,#f97316,#6366f1);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;font-weight:700">conic</div>
  </div>`;
}
function createOpacityDemo() {
  const opacities = [1, 0.7, 0.4, 0.15];
  return `<div style="display:flex;gap:8px;align-items:flex-end;padding:10px">${opacities.map((o) => `<div style="background:#f97316;width:34px;height:${14 + o * 50}px;border-radius:4px;opacity:${o};display:flex;align-items:flex-end;justify-content:center;padding-bottom:2px"><span style="font-size:9px;font-weight:700;color:#fff">${o}</span></div>`).join("")}</div>`;
}
function createColorSchemeDemo() {
  return `<div style="display:flex;gap:8px;padding:10px">
    <div style="color-scheme:light;background:#fff;border:2px solid #e5e7eb;border-radius:6px;padding:8px;width:90px">
      <input type="checkbox" aria-label="Light scheme checkbox" checked style="accent-color:#f97316;width:14px;height:14px">
      <p style="font-size:9px;font-weight:700;color:#111;margin-top:4px">light scheme</p>
    </div>
    <div style="color-scheme:dark;background:#1e1e2e;border:2px solid #444;border-radius:6px;padding:8px;width:90px">
      <input type="checkbox" aria-label="Light scheme checkbox" checked style="accent-color:#f97316;width:14px;height:14px">
      <p style="font-size:9px;font-weight:700;color:#cdd6f4;margin-top:4px">dark scheme</p>
    </div>
  </div>`;
}
function createAccentColorDemo() {
  return `<div style="padding:10px;display:flex;flex-direction:column;gap:8px">
    <div style="display:flex;align-items:center;gap:8px;accent-color:#6366f1">
      <input type="checkbox" aria-label="Accent color checkbox" checked>
      <input type="range" aria-label="Accent color slider" value="60" style="width:80px">
      <span style="font-size:10px;font-weight:700;color:#6366f1">#6366f1</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;accent-color:#f97316">
      <input type="checkbox" aria-label="Accent color checkbox" checked>
      <input type="range" aria-label="Accent color slider" value="40" style="width:80px">
      <span style="font-size:10px;font-weight:700;color:#f97316">#f97316</span>
    </div>
  </div>`;
}
function createColorMixDemo() {
  return `<div style="display:flex;align-items:center;gap:6px;padding:10px">
    <div style="width:40px;height:40px;background:#6366f1;border-radius:50%"></div>
    <div style="font-size:14px;font-weight:700;color:#888">+</div>
    <div style="width:40px;height:40px;background:#ec4899;border-radius:50%"></div>
    <div style="font-size:14px;font-weight:700;color:#888">=</div>
    <div style="width:40px;height:40px;background:color-mix(in oklch,#6366f1 50%,#ec4899);border-radius:50%"></div>
    <div style="font-size:9px;color:#888;font-weight:700">50% / 50%</div>
  </div>`;
}
function createOklchDemo() {
  const hues = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360];
  return `<div style="display:flex;gap:4px;padding:10px">${hues.map((h) => `<div style="flex:1;height:52px;background:oklch(65% .2 ${h});border-radius:3px"></div>`).join("")}</div>`;
}
function createLightDarkDemo() {
  return `<div style="display:flex;gap:8px;padding:10px">
    <div style="background:#fff;border:2px solid #e5e7eb;border-radius:6px;padding:8px;flex:1;text-align:center">
      <p style="font-size:10px;font-weight:700;color:light-dark(#111,#eee)">light-dark()</p>
      <p style="font-size:9px;color:#888;font-weight:700">light mode</p>
    </div>
    <div style="background:#1e1e2e;border:2px solid #444;border-radius:6px;padding:8px;flex:1;text-align:center;color-scheme:dark">
      <p style="font-size:10px;font-weight:700;color:light-dark(#111,#cdd6f4)">light-dark()</p>
      <p style="font-size:9px;color:#888;font-weight:700">dark mode</p>
    </div>
  </div>`;
}
var color = [
  {
    name: "color",
    category: "Color",
    description: "Sets the foreground (text) color. Supports named colors, hex, rgb, hsl, oklch, and more.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "color: #111 | oklch(70% 0.2 220) | transparent",
    mdnPath: "color",
    demo: createColorDemo(),
    values: [
      {
        value: "named",
        label: "Named Colors (e.g., red, blue)",
        description: "CSS supports 140+ named colors like 'red', 'blue', 'coral', 'teal'. Easy to remember but limited palette."
      },
      {
        value: "hex",
        label: "Hexadecimal (#RRGGBB)",
        description: "Six-digit hex codes like #FF5733. #000 is black, #FFF is white. Most common for precise colors."
      },
      {
        value: "rgb()",
        label: "RGB (rgb(r, g, b))",
        description: "Three values from 0-255 for red, green, blue. rgb(255, 0, 0) is pure red. Supports alpha via rgba()."
      },
      {
        value: "hsl()",
        label: "HSL (hsl(h, s%, l%))",
        description: "Hue (0-360), Saturation (0-100%), Lightness (0-100%). Easier to adjust colors programmatically."
      },
      {
        value: "oklch()",
        label: "OKLCH (perceptually uniform)",
        description: "Modern color space with consistent perceived brightness. Supports wide gamuts for vivid colors. The future of CSS colors."
      },
      {
        value: "transparent",
        label: "Transparent",
        description: "Fully transparent. Same as rgba(0,0,0,0). Useful for layered effects."
      },
      {
        value: "currentColor",
        label: "CurrentColor",
        description: "Inherits the color from the element's color property. Useful for icons and borders that should match text."
      }
    ]
  },
  {
    name: "background",
    category: "Color",
    description: "Shorthand for all background properties — color, image, position, size, and repeat.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "background: #fff url(bg.png) no-repeat center/cover",
    mdnPath: "background",
    demo: createBackgroundDemo(),
    values: [
      {
        value: "color",
        label: "Background Color Only",
        description: "background: red or background: #FF5733. The simplest form—just sets a solid color."
      },
      {
        value: "image",
        label: "Background Image",
        description: "background: url(image.png) or background: linear-gradient(). Adds an image or gradient as background."
      },
      {
        value: "repeat",
        label: "Repeat Pattern",
        description: "background: repeat-x, repeat-y, or no-repeat. Controls how the image tiles across the element."
      },
      {
        value: "position",
        label: "Position",
        description: "background: center, top left, 50% 25%. Positions the image within the element."
      },
      {
        value: "size",
        label: "Size",
        description: "background: cover or contain, or specific sizes like 100px 200px. Controls image dimensions."
      },
      {
        value: "shorthand",
        label: "Full Shorthand",
        description: "background: url(img.jpg) no-repeat center / cover. Position and size are separated by a slash."
      }
    ]
  },
  {
    name: "opacity",
    category: "Color",
    description: "Sets the transparency of an element and all its descendants.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "opacity: 1 | 0.5 | 0",
    mdnPath: "opacity",
    demo: createOpacityDemo(),
    values: [
      {
        value: "1",
        label: "Full Opacity (1)",
        description: "Fully opaque. The element is completely visible. This is the default."
      },
      {
        value: "0-1",
        label: "Partial (0.1 - 0.9)",
        description: "The element is semi-transparent. Lower values make it more see-through."
      },
      {
        value: "0",
        label: "Fully Transparent (0)",
        description: "Completely invisible. The element still occupies space but can't be seen."
      }
    ]
  },
  {
    name: "color-scheme",
    category: "Color",
    description: "Declares which color schemes an element renders in, enabling automatic dark mode adaptation.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "color-scheme: normal | light | dark | light dark | only light",
    mdnPath: "color-scheme",
    demo: createColorSchemeDemo(),
    values: [
      {
        value: "normal",
        label: "Normal",
        description: "Uses the default color scheme of the browser. No special handling."
      },
      {
        value: "light",
        label: "Light",
        description: "Forces light mode rendering. Form controls and scrollbars use light colors theme."
      },
      {
        value: "dark",
        label: "Dark",
        description: "Forces dark mode rendering. Form controls and scrollbars use dark theme colors."
      },
      {
        value: "light dark",
        label: "Light Dark",
        description: "Allows both light and dark depending on user preference. Browser will automatically adapt."
      }
    ]
  },
  {
    name: "accent-color",
    category: "Color",
    description: "Sets the accent color for native browser UI controls like checkboxes, radios, and range inputs.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "accent-color: auto | #6366f1",
    mdnPath: "accent-color",
    demo: createAccentColorDemo()
  },
  {
    name: "color-mix()",
    category: "Color",
    description: "Mixes two colors together in a specified color space at a given ratio.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "color: color-mix(in oklch, hotpink 60%, white)",
    mdnPath: "color_value/color-mix",
    demo: createColorMixDemo()
  },
  {
    name: "oklch()",
    category: "Color",
    description: "Defines a color in the perceptually uniform OKLch color space — consistent chroma across hues.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "color: oklch(70% 0.2 220 / 0.8)",
    mdnPath: "color_value/oklch",
    demo: createOklchDemo()
  },
  {
    name: "light-dark()",
    category: "Color",
    description: "Returns one of two values depending on whether the current color scheme is light or dark.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2024",
    example: "color: light-dark(#111, #eee)",
    mdnPath: "color_value/light-dark",
    demo: createLightDarkDemo()
  },
  {
    name: "linear-gradient()",
    category: "Color",
    description: "Creates a linear color transition image, commonly used in backgrounds and masks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "background: linear-gradient(135deg, #6366f1, #ec4899)",
    mdnPath: "gradient/linear-gradient",
    demo: `<div style="padding:10px"><div style="height:56px;border-radius:6px;background:linear-gradient(135deg,#6366f1,#ec4899,#f97316)"></div></div>`
  },
  {
    name: "radial-gradient()",
    category: "Color",
    description: "Creates a radial (circular or elliptical) color transition image from a central point.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "background: radial-gradient(circle at center, #f97316, #7c3aed)",
    mdnPath: "gradient/radial-gradient",
    demo: `<div style="padding:10px"><div style="height:56px;border-radius:6px;background:radial-gradient(circle at center,#f97316,#7c3aed)"></div></div>`
  },
  {
    name: "conic-gradient()",
    category: "Color",
    description: "Creates a conic color transition around a center point, useful for color wheels and progress visuals.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "background: conic-gradient(from 0deg, #6366f1, #ec4899, #f97316, #6366f1)",
    mdnPath: "gradient/conic-gradient",
    demo: `<div style="padding:10px;display:flex;justify-content:center"><div style="width:64px;height:64px;border-radius:50%;background:conic-gradient(from 0deg,#6366f1,#ec4899,#f97316,#6366f1)"></div></div>`
  }
];

// src/data/sizing.ts
var sizing = [
  {
    name: "width / height",
    category: "Sizing",
    description: "Sets element dimensions. Supports fixed lengths, percentages, and intrinsic size keywords.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: auto | 100% | 300px | min-content | max-content | fit-content",
    mdnPath: "width",
    demo: `<div style="display:flex;flex-direction:column;gap:5px;padding:8px;width:100%"><div style="width:40%;height:18px;background:#06b6d4;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: 40%</div><div style="width:fit-content;height:18px;background:#0891b2;border-radius:3px;padding:0 8px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">fit-content</div><div style="width:100%;height:18px;background:#0e7490;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: 100%</div></div>`
  },
  {
    name: "aspect-ratio",
    category: "Sizing",
    description: "Sets a preferred aspect ratio so the element automatically scales proportionally.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "aspect-ratio: auto | 16/9 | 1 | 4/3",
    mdnPath: "aspect-ratio",
    demo: `<div style="display:flex;gap:10px;align-items:flex-end;padding:8px"><div style="aspect-ratio:1;width:52px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">1:1</div><div style="aspect-ratio:16/9;height:40px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">16:9</div><div style="aspect-ratio:4/3;height:44px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">4:3</div></div>`
  },
  {
    name: "min / max sizing",
    category: "Sizing",
    description: "min-width, max-width, min-height, max-height put hard constraints on element dimensions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: `max-width: 65ch;
min-height: 100svh;
max-inline-size: 80rem`,
    mdnPath: "max-width",
    demo: `<div style="padding:8px;width:100%"><div style="max-width:160px;min-height:30px;background:#06b6d4;border-radius:5px;padding:6px;font-size:10px;font-weight:700;color:#fff;text-align:center">max-width: 160px<br>min-height: 30px</div></div>`
  },
  {
    name: "box-sizing",
    category: "Sizing",
    description: "Controls whether padding and border are included in the element's stated width and height.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "box-sizing: content-box | border-box",
    mdnPath: "box-sizing",
    demo: `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:80px;box-sizing:content-box;background:#bae6fd;border:6px solid #06b6d4;border-radius:3px;padding:6px;font-size:9px;font-weight:700;color:#0e7490;text-align:center">content-box<br>+padding+border</div><div style="width:80px;box-sizing:border-box;background:#e0f2fe;border:6px solid #0891b2;border-radius:3px;padding:6px;font-size:9px;font-weight:700;color:#0e7490;text-align:center">border-box<br>all included</div></div>`
  },
  {
    name: "inline-size",
    category: "Sizing",
    description: "Logical equivalent of width — adapts to writing direction. In vertical writing modes, this becomes height.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "inline-size: 100% | 300px | auto",
    mdnPath: "inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="inline-size:60%;height:30px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">inline-size: 60%</div></div>`
  },
  {
    name: "block-size",
    category: "Sizing",
    description: "Logical equivalent of height — adapts to writing direction. In vertical writing modes, this becomes width.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "block-size: auto | 200px | 100%",
    mdnPath: "block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;block-size:50px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">block-size: 50px</div></div>`
  },
  {
    name: "min-inline-size",
    category: "Sizing",
    description: "Logical equivalent of min-width — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "min-inline-size: 0 | 200px | 100%",
    mdnPath: "min-inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="min-inline-size:120px;height:30px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">min-inline-size: 120px</div></div>`
  },
  {
    name: "min-block-size",
    category: "Sizing",
    description: "Logical equivalent of min-height — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "min-block-size: auto | 100px | 100%",
    mdnPath: "min-block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;min-block-size:40px;background:#06b6d4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">min-block-size: 40px</div></div>`
  },
  {
    name: "max-inline-size",
    category: "Sizing",
    description: "Logical equivalent of max-width — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "max-inline-size: 80ch | none | 100%",
    mdnPath: "max-inline-size",
    demo: `<div style="padding:8px;width:100%"><div style="max-inline-size:140px;height:30px;background:#0891b2;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;padding:0 8px">max-inline-size: 140px</div></div>`
  },
  {
    name: "max-block-size",
    category: "Sizing",
    description: "Logical equivalent of max-height — adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "max-block-size: 100svh | none",
    mdnPath: "max-block-size",
    demo: `<div style="padding:8px;width:100%"><div style="width:100%;max-block-size:60px;background:#0e7490;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;height:80px">max-block-size: 60px</div></div>`
  },
  {
    name: "calc()",
    category: "Sizing",
    description: "Performs math on CSS values so you can combine units dynamically at runtime.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: calc(100% - 2rem)",
    mdnPath: "calc",
    demo: `<div style="padding:8px;width:100%;background:#ecfeff;border:2px dashed #06b6d4;border-radius:6px"><div style="width:calc(100% - 24px);height:26px;background:#06b6d4;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: calc(100% - 24px)</div></div>`
  },
  {
    name: "min()",
    category: "Sizing",
    description: "Chooses the smallest value from a list of expressions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: min(80vw, 320px)",
    mdnPath: "min",
    demo: `<div style="padding:8px;width:100%"><div style="width:min(80vw,160px);height:26px;background:#0891b2;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: min(80vw, 160px)</div></div>`
  },
  {
    name: "max()",
    category: "Sizing",
    description: "Chooses the largest value from a list of expressions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "width: max(12rem, 40%)",
    mdnPath: "max",
    demo: `<div style="padding:8px;width:100%"><div style="width:max(120px,40%);height:26px;background:#0e7490;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff">width: max(120px, 40%)</div></div>`
  }
];

// src/data/visual.ts
function createBorderRadiusDemo() {
  return `<div style="display:flex;gap:8px;align-items:center;padding:10px">${[
    ["0px", "0px"],
    ["4px", "4px"],
    ["10px", "10px"],
    ["50%", "50%"]
  ].map(([r, l]) => `<div style="width:36px;height:36px;background:#10b981;border-radius:${r};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">${l}</div>`).join("")}</div>`;
}
function createBoxShadowDemo() {
  return `<div style="display:flex;gap:14px;padding:16px 10px;align-items:center">${[
    [`0 1px 3px rgba(0,0,0,.12)`, `sm`],
    [`0 4px 12px rgba(0,0,0,.15)`, `md`],
    [`0 10px 30px rgba(0,0,0,.2)`, `lg`]
  ].map(([s, l]) => `<div style="width:36px;height:36px;background:#fff;border-radius:5px;box-shadow:${s};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#10b981">${l}</div>`).join("")}</div>`;
}
function createBackdropFilterDemo() {
  return `<div style="position:relative;width:200px;height:72px;background:linear-gradient(135deg,#6366f1,#ec4899,#f97316);border-radius:6px;overflow:hidden"><div style="position:absolute;inset:12px 20px;backdrop-filter:blur(8px) brightness(1.2);background:rgba(255,255,255,.15);border-radius:4px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff">backdrop-filter: blur</div></div>`;
}
function createFilterDemo() {
  return `<div style="display:flex;gap:6px;padding:8px">${[
    ["none", "no filter"],
    ["grayscale(1)", "grayscale"],
    ["hue-rotate(180deg)", "hue"],
    ["brightness(1.5)", "bright"]
  ].map(([f, l]) => `<div style="text-align:center"><div style="width:34px;height:34px;background:linear-gradient(135deg,#6366f1,#ec4899);border-radius:4px;filter:${f}"></div><p style="font-size:8px;color:#888;font-weight:700;margin-top:2px">${l}</p></div>`).join("")}</div>`;
}
function createClipPathDemo() {
  return `<div style="display:flex;gap:10px;padding:10px;align-items:center">${[
    ["circle(50%)", ""],
    ["polygon(50% 0,100% 100%,0 100%)", ""],
    ["polygon(0 0,100% 0,100% 75%,50% 100%,0 75%)", ""]
  ].map(([c]) => `<div style="width:44px;height:44px;background:linear-gradient(135deg,#10b981,#06b6d4);clip-path:${c}"></div>`).join("")}</div>`;
}
function createMaskDemo() {
  return `<div style="padding:10px"><div style="width:180px;height:60px;background:linear-gradient(135deg,#6366f1,#ec4899,#f97316);border-radius:5px;mask:linear-gradient(to right,black 60%,transparent);-webkit-mask:linear-gradient(to right,black 60%,transparent);display:flex;align-items:center;padding-left:10px;font-size:11px;font-weight:700;color:#fff">Fading out →</div></div>`;
}
function createMixBlendModeDemo() {
  return `<div style="padding:10px;position:relative"><div style="width:80px;height:60px;background:#6366f1;border-radius:4px;position:relative;overflow:visible"><div style="position:absolute;left:25px;top:8px;width:60px;height:44px;background:#f97316;border-radius:4px;mix-blend-mode:multiply"></div></div><p style="font-size:9px;font-weight:700;color:#888;margin-top:4px">mix-blend-mode: multiply</p></div>`;
}
function createBorderDemo() {
  return `<div style="display:flex;gap:10px;padding:10px;align-items:center">${[
    [`2px solid #10b981`, `solid`],
    [`3px dashed #6366f1`, `dashed`],
    [`4px dotted #ec4899`, `dotted`]
  ].map(([b, l]) => `<div style="width:50px;height:50px;border:${b};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#374151;background:#f9fafb">${l}</div>`).join("")}</div>`;
}
function createOutlineDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#f0fdf4;border-radius:4px;outline:2px solid #10b981;outline-offset:2px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">focus</div><div style="width:60px;height:50px;background:#eff6ff;border-radius:4px;outline:3px dashed #3b82f6;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#1d4ed8">dashed</div></div>`;
}
function createOutlineOffsetDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:50px;height:50px;background:#fef3c7;border:2px solid #f59e0b;border-radius:4px;outline:2px solid #f97316;outline-offset:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#92400e">+4px</div><div style="width:50px;height:50px;background:#fce7f3;border:2px solid #ec4899;border-radius:4px;outline:2px solid #db2777;outline-offset:-4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#9d174d">-4px</div></div>`;
}
function createBorderInlineDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#f0fdf4;border-inline:4px solid #10b981;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">inline</div><div style="font-size:9px;color:#888;font-weight:700">left & right<br>(in LTR)</div></div>`;
}
function createBorderBlockDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#fdf2f8;border-block:4px dashed #ec4899;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#be185d">block</div><div style="font-size:9px;color:#888;font-weight:700">top & bottom</div></div>`;
}
function createBorderInlineStartDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#eef2ff;border-inline-start:4px solid #6366f1;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#4338ca">start</div><div style="font-size:9px;color:#888;font-weight:700">← left in LTR</div></div>`;
}
function createBorderInlineEndDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#f5f3ff;border-inline-end:4px solid #8b5cf6;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#7c3aed">end</div><div style="font-size:9px;color:#888;font-weight:700">right in LTR →</div></div>`;
}
function createBorderBlockStartDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#fefbeb;border-block-start:4px solid #f59e0b;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#b45309">start</div><div style="font-size:9px;color:#888;font-weight:700">top ↑</div></div>`;
}
function createBorderBlockEndDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:70px;height:50px;background:#fff7ed;border-block-end:4px solid #f97316;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#c2410c">end</div><div style="font-size:9px;color:#888;font-weight:700">bottom ↓</div></div>`;
}
function createBorderStartStartRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#e0e7ff;border:2px solid #6366f1;border-start-start-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#4338ca">start-start</div><div style="font-size:9px;color:#888;font-weight:700">top-left<br>in LTR</div></div>`;
}
function createBorderStartEndRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#f5f3ff;border:2px solid #8b5cf6;border-start-end-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#7c3aed">start-end</div><div style="font-size:9px;color:#888;font-weight:700">top-right<br>in LTR</div></div>`;
}
function createBorderEndStartRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#fdf2f8;border:2px solid #ec4899;border-end-start-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#be185d">end-start</div><div style="font-size:9px;color:#888;font-weight:700">bottom-left<br>in LTR</div></div>`;
}
function createBorderEndEndRadiusDemo() {
  return `<div style="display:flex;gap:12px;padding:10px;align-items:center"><div style="width:60px;height:50px;background:#fff7ed;border:2px solid #f97316;border-end-end-radius:12px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#c2410c">end-end</div><div style="font-size:9px;color:#888;font-weight:700">bottom-right<br>in LTR</div></div>`;
}
function createBorderImageDemo() {
  return `<div style="padding:10px"><div style="border:6px solid transparent;border-image:linear-gradient(45deg,#6366f1,#ec4899) 1;background:#eef2ff;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">border-image</div></div>`;
}
var visual = [
  {
    name: "border-radius",
    category: "Visual",
    description: "Rounds element corners. Supports per-corner values and elliptical radii.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-radius: 8px | 50% | 1rem 2rem / 0.5rem 1rem",
    mdnPath: "border-radius",
    default: "0",
    demo: createBorderRadiusDemo()
  },
  {
    name: "box-shadow",
    category: "Visual",
    description: "Adds one or more drop shadows behind an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.06)",
    mdnPath: "box-shadow",
    default: "none",
    demo: createBoxShadowDemo()
  },
  {
    name: "backdrop-filter",
    category: "Visual",
    description: "Applies graphical effects (blur, brightness, etc.) to the content behind an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "backdrop-filter: blur(10px) saturate(1.5)",
    mdnPath: "backdrop-filter",
    demo: createBackdropFilterDemo()
  },
  {
    name: "filter",
    category: "Visual",
    description: "Applies visual effects — blur, brightness, contrast, grayscale, drop-shadow — to an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "filter: blur(4px) | brightness(1.2) | drop-shadow(0 4px 6px #0003)",
    mdnPath: "filter",
    demo: createFilterDemo()
  },
  {
    name: "clip-path",
    category: "Visual",
    description: "Clips the visible region of an element to a specified shape — circle, polygon, or SVG path.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "clip-path: circle(50%) | polygon(0 0, 100% 0, 50% 100%)",
    mdnPath: "clip-path",
    demo: createClipPathDemo()
  },
  {
    name: "mask",
    category: "Visual",
    description: "Hides parts of an element using an image, gradient, or SVG as a masking layer.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "mask: linear-gradient(to bottom, black, transparent)",
    mdnPath: "mask",
    demo: createMaskDemo()
  },
  {
    name: "mix-blend-mode",
    category: "Visual",
    description: "Sets how an element's content blends with its background and the layers behind it.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "mix-blend-mode: normal | multiply | screen | overlay | luminosity",
    mdnPath: "mix-blend-mode",
    demo: createMixBlendModeDemo()
  },
  {
    name: "border",
    category: "Visual",
    description: "Shorthand for border-width, border-style, and border-color. Individual sides: border-top, border-right, border-bottom, border-left.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border: 2px solid #6366f1 | 1px dashed red",
    mdnPath: "border",
    demo: createBorderDemo()
  },
  {
    name: "outline",
    category: "Visual",
    description: "Draws a line around elements, outside the border. Key for accessibility — focus indicators.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "outline: 2px solid #6366f1 | 3px dashed red",
    mdnPath: "outline",
    demo: createOutlineDemo()
  },
  {
    name: "outline-offset",
    category: "Visual",
    description: "Sets the space between an outline and the element's border. Negative values pull it inside.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "outline-offset: 2px | -2px",
    mdnPath: "outline-offset",
    demo: createOutlineOffsetDemo()
  },
  {
    name: "border-inline",
    category: "Visual",
    description: "Logical shorthand for border-left and border-right (in LTR). Adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-inline: 2px solid #6366f1",
    mdnPath: "border-inline",
    demo: createBorderInlineDemo()
  },
  {
    name: "border-block",
    category: "Visual",
    description: "Logical shorthand for border-top and border-bottom. Adapts to writing direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-block: 2px dashed #ec4899",
    mdnPath: "border-block",
    demo: createBorderBlockDemo()
  },
  {
    name: "border-inline-start",
    category: "Visual",
    description: "Logical border at the start of the inline axis — left in LTR, right in RTL.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-inline-start: 3px solid #6366f1",
    mdnPath: "border-inline-start",
    demo: createBorderInlineStartDemo()
  },
  {
    name: "border-inline-end",
    category: "Visual",
    description: "Logical border at the end of the inline axis — right in LTR, left in RTL.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-inline-end: 3px solid #8b5cf6",
    mdnPath: "border-inline-end",
    demo: createBorderInlineEndDemo()
  },
  {
    name: "border-block-start",
    category: "Visual",
    description: "Logical border at the start of the block axis — top in horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-block-start: 3px solid #f59e0b",
    mdnPath: "border-block-start",
    demo: createBorderBlockStartDemo()
  },
  {
    name: "border-block-end",
    category: "Visual",
    description: "Logical border at the end of the block axis — bottom in horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-block-end: 3px solid #f97316",
    mdnPath: "border-block-end",
    demo: createBorderBlockEndDemo()
  },
  {
    name: "border-start-start-radius",
    category: "Visual",
    description: "Logical corner radius for start-start — top-left in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-start-start-radius: 8px",
    mdnPath: "border-start-start-radius",
    demo: createBorderStartStartRadiusDemo()
  },
  {
    name: "border-start-end-radius",
    category: "Visual",
    description: "Logical corner radius for start-end — top-right in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-start-end-radius: 8px",
    mdnPath: "border-start-end-radius",
    demo: createBorderStartEndRadiusDemo()
  },
  {
    name: "border-end-start-radius",
    category: "Visual",
    description: "Logical corner radius for end-start — bottom-left in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-end-start-radius: 8px",
    mdnPath: "border-end-start-radius",
    demo: createBorderEndStartRadiusDemo()
  },
  {
    name: "border-end-end-radius",
    category: "Visual",
    description: "Logical corner radius for end-end — bottom-right in LTR horizontal writing modes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-end-end-radius: 8px",
    mdnPath: "border-end-end-radius",
    demo: createBorderEndEndRadiusDemo()
  },
  {
    name: "border-image",
    category: "Visual",
    description: "Replaces the element border with an image or gradient — use border-image-source, slice, width, and repeat.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-image: linear-gradient(45deg,#6366f1,#ec4899) 1",
    mdnPath: "border-image",
    demo: createBorderImageDemo()
  }
];

// src/data/animation.ts
function createTransitionDemo() {
  return `<style>.t-demo{transition:transform .4s cubic-bezier(.5,1.25,.75,1.25),background .4s;animation:demo-pulse 2s ease-in-out infinite}</style>
  <div style="padding:10px;text-align:center">
    <div class="t-demo" style="display:inline-block;background:#f59e0b;color:#fff;padding:10px 20px;border-radius:8px;font-size:11px;font-weight:700">Animating…</div>
    <p style="font-size:9px;color:#888;font-weight:700;margin-top:6px">transition: transform .4s ease</p>
  </div>`;
}
function createAnimationDemo() {
  return `<div style="display:flex;gap:16px;align-items:center;padding:10px">
    <div style="width:36px;height:36px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:6px;animation:demo-spin 2s linear infinite"></div>
    <div style="width:36px;height:36px;background:#f59e0b;border-radius:50%;animation:demo-bounce 1s ease-in-out infinite"></div>
    <div style="width:36px;height:36px;background:linear-gradient(135deg,#6366f1,#f97316);border-radius:6px;animation:demo-color 3s linear infinite"></div>
  </div>`;
}
function createAnimationTimelineDemo() {
  return `<div style="padding:10px;width:100%">
    <div style="background:#fef3c7;border-radius:5px;height:18px;width:100%;overflow:hidden;border:2px solid #f59e0b">
      <div style="height:100%;width:70%;background:linear-gradient(90deg,#f59e0b,#ec4899);border-radius:3px;animation:demo-width 3s ease-in-out infinite"></div>
    </div>
    <p style="font-size:9px;color:#888;font-weight:700;margin-top:6px">Scroll-driven progress bar</p>
  </div>`;
}
function createViewTransitionNameDemo() {
  return `<div style="display:flex;align-items:center;gap:12px;padding:10px">
    <div style="width:40px;height:40px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:6px;animation:demo-pulse 2s ease infinite"></div>
    <div style="font-size:18px">→</div>
    <div style="width:60px;height:60px;background:linear-gradient(135deg,#f59e0b,#ec4899);border-radius:12px;animation:demo-pulse 2s ease infinite;animation-delay:.1s"></div>
    <p style="font-size:9px;color:#888;font-weight:700">Morphing between pages</p>
  </div>`;
}
function createOffsetPathDemo() {
  return `<style>.op-dot{width:14px;height:14px;background:#f59e0b;border-radius:50%;offset-path:path("M 10,40 C 40,5 100,5 130,40 S 220,75 150,40");animation:demo-path 2s linear infinite}</style>
  <svg style="position:absolute;opacity:.2" width="200" height="72" viewBox="0 0 200 72">
    <path d="M 10,40 C 40,5 100,5 130,40 S 220,75 150,40" stroke="#f59e0b" fill="none" stroke-width="2" stroke-dasharray="4"/>
  </svg>
  <div class="op-dot"></div>`;
}
function createWillChangeDemo() {
  return `<div style="display:flex;gap:10px;padding:10px;align-items:center">
    <div style="will-change:transform;background:#f59e0b;color:#fff;padding:10px 14px;border-radius:6px;font-size:10px;font-weight:700;animation:demo-bounce 1.5s ease-in-out infinite">promoted</div>
    <div style="font-size:9px;color:#888;font-weight:700">GPU layer hint<br>via will-change</div>
  </div>`;
}
function createTransitionDurationDemo() {
  return `<style>.td-wrap{display:flex;gap:8px}.td-chip{padding:8px 10px;border-radius:6px;color:#fff;font-size:10px;font-weight:700;cursor:pointer}.td-fast{background:#6366f1;transition-property:transform;transition-duration:120ms}.td-slow{background:#ec4899;transition-property:transform;transition-duration:900ms}.td-chip:hover{transform:translateY(-4px)}</style>
  <div class="td-wrap" style="padding:10px">
    <div class="td-chip td-fast">120ms</div>
    <div class="td-chip td-slow">900ms</div>
  </div>`;
}
function createAnimationDurationDemo() {
  return `<style>@keyframes ad-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}.ad{width:32px;height:32px;border-radius:6px;background:#f59e0b;animation-name:ad-pulse;animation-iteration-count:infinite}.ad-fast{animation-duration:.6s}.ad-slow{animation-duration:2s;background:#6366f1}</style>
  <div style="display:flex;gap:14px;align-items:center;padding:10px">
    <div class="ad ad-fast"></div>
    <div class="ad ad-slow"></div>
    <p style="font-size:9px;color:#888;font-weight:700">fast vs slow duration</p>
  </div>`;
}
function createAnimationCompositionDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-scale,demo-rotate;animation-duration:2s;animation-iteration-count:infinite;animation-composition:add;background:#6366f1;width:40px;height:40px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">add</div>
  </div>`;
}
function createAnimationDelayDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-pulse;animation-duration:1.4s;animation-iteration-count:infinite;animation-delay:.5s;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-delay</div>
  </div>`;
}
function createAnimationDirectionDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-path;animation-duration:2s;animation-iteration-count:infinite;animation-direction:alternate;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-direction</div>
  </div>`;
}
function createAnimationFillModeDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-width;animation-duration:1.2s;animation-fill-mode:forwards;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-fill-mode</div>
  </div>`;
}
function createAnimationIterationCountDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-spin;animation-duration:1.2s;animation-iteration-count:3;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-iteration-count</div>
  </div>`;
}
function createAnimationNameDemo() {
  return `<div style="padding:10px">
    <div style="animation-name: demo-spin;animation-duration:1.5s;animation-iteration-count:infinite;display:inline-block;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-name</div>
  </div>`;
}
function createAnimationPlayStateDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-bounce;animation-duration:1.2s;animation-iteration-count:infinite;animation-play-state:paused;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-play-state</div>
  </div>`;
}
function createAnimationTimingFunctionDemo() {
  return `<div style="padding:10px">
    <div style="animation-name:demo-bounce;animation-duration:1.4s;animation-iteration-count:infinite;animation-timing-function:linear;background:#eef2ff;border:2px solid #6366f1;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#4338ca">animation-timing-function</div>
  </div>`;
}
function createTransitionBehaviorDemo() {
  return `<style>.tb-demo{transition:display .3s,height .3s;transition-behavior:allow-discrete;overflow:hidden;height:40px}.tb-demo.hidden{display:none;height:0}</style>
  <div style="padding:10px">
    <div class="tb-demo" id="tbBox" style="background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff"><span>display transition</span></div>
    <button onclick="document.getElementById('tbBox').classList.toggle('hidden')" style="margin-top:6px;font-size:9px;padding:2px 8px;border-radius:3px;border:1px solid #6366f1;background:#fff;color:#6366f1;cursor:pointer">Toggle</button>
  </div>`;
}
function createTransitionPropertyDemo() {
  return `<style>.tp-demo{transition-duration:.4s;padding:8px;background:#6366f1;color:#fff;border-radius:5px;font-size:9px;font-weight:700}.tp-demo:hover{transform:scale(1.1);opacity:.7}</style>
  <div style="padding:10px">
    <div class="tp-demo" style="transition-property:transform">transform only</div>
    <div class="tp-demo" style="transition-property:opacity;margin-top:6px">opacity only</div>
  </div>`;
}
function createTransitionTimingFunctionDemo() {
  return `<style>.ttf-box{transition:transform .6s;padding:6px 10px;background:#6366f1;color:#fff;border-radius:4px;font-size:9px;font-weight:700;margin-bottom:6px}.ttf-linear{transition-timing-function:linear}.ttf-ease{transition-timing-function:ease-in-out}</style>
  <div style="padding:10px" onmouseenter="this.querySelectorAll('.ttf-box').forEach(b=>b.style.transform='translateX(80px)')" onmouseleave="this.querySelectorAll('.ttf-box').forEach(b=>b.style.transform='translateX(0)')">
    <div class="ttf-box ttf-linear">linear</div>
    <div class="ttf-box ttf-ease">ease-in-out</div>
  </div>`;
}
var animation = [
  {
    name: "transition",
    category: "Animation",
    description: "Shorthand to animate changes between property values when an element changes state.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transition: color 0.2s ease, transform 0.3s ease-out 0.1s",
    mdnPath: "transition",
    caniuse: "css-transitions",
    default: "all 0s ease 0s",
    demo: createTransitionDemo()
  },
  {
    name: "animation",
    category: "Animation",
    description: "Shorthand for all animation sub-properties — references @keyframes by name.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation: spin 1s linear infinite",
    mdnPath: "animation",
    caniuse: "css-animation",
    default: "none 0s ease 0s 1 normal none running",
    demo: createAnimationDemo()
  },
  {
    name: "animation-timeline",
    category: "Animation",
    description: "Specifies the timeline controlling a CSS animation — enables scroll and view progress animations.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: "animation-timeline: scroll() | view() | --my-timeline",
    mdnPath: "animation-timeline",
    caniuse: "css-animation",
    demo: createAnimationTimelineDemo()
  },
  {
    name: "view-transition-name",
    category: "Animation",
    description: "Names an element for the View Transitions API, enabling cross-page morphing animations.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2024",
    example: "view-transition-name: hero-image | none",
    mdnPath: "view-transition-name",
    caniuse: "view-transitions",
    demo: createViewTransitionNameDemo()
  },
  {
    name: "offset-path",
    category: "Animation",
    description: "Defines a path along which an element moves via CSS Motion Path.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: 'offset-path: path("M 0,0 C 50,100 150,100 200,0")',
    mdnPath: "offset-path",
    caniuse: "css-motion-paths",
    demo: createOffsetPathDemo()
  },
  {
    name: "will-change",
    category: "Animation",
    description: "Hints to the browser which properties will change, letting it optimise rendering ahead of time.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "will-change: transform | opacity | auto",
    mdnPath: "will-change",
    caniuse: "will-change",
    demo: createWillChangeDemo()
  },
  {
    name: "transition-duration",
    category: "Animation",
    description: "Sets how long a transition takes from start to end.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transition-duration: 150ms | 0.6s",
    mdnPath: "transition-duration",
    caniuse: "css-transitions",
    demo: createTransitionDurationDemo(),
    values: [
      {
        value: "0s",
        label: "Zero (0s)",
        description: "The transition is instant with no animation. This is the default."
      },
      {
        value: "seconds",
        label: "Seconds (e.g., 0.3s, 1s)",
        description: "The transition takes the specified seconds. Common values range from 0.2s to 0.5s for UI interactions."
      },
      {
        value: "milliseconds",
        label: "Milliseconds (e.g., 200ms)",
        description: "The transition duration in milliseconds. 200-300ms feels responsive for hover states."
      }
    ]
  },
  {
    name: "animation-duration",
    category: "Animation",
    description: "Sets the length of time one animation cycle takes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-duration: 500ms | 2s",
    mdnPath: "animation-duration",
    caniuse: "css-animation",
    demo: createAnimationDurationDemo(),
    values: [
      {
        value: "0s",
        label: "Zero (0s)",
        description: "The animation takes no time and won't play. This is the default."
      },
      {
        value: "seconds",
        label: "Seconds (e.g., 1s, 2.5s)",
        description: "The animation duration in seconds. You can use decimal values like 1.5s for more precision."
      },
      {
        value: "milliseconds",
        label: "Milliseconds (e.g., 500ms)",
        description: "The animation duration in milliseconds. 1000ms equals 1 second. Useful for short animations."
      }
    ]
  },
  {
    name: "animation-composition",
    category: "Animation",
    description: "Controls how multiple animations on the same property combine — replace (default), add (sum values), or accumulate (combine transforms).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "animation-composition: replace | add | accumulate",
    mdnPath: "animation-composition",
    demo: createAnimationCompositionDemo()
  },
  {
    name: "animation-delay",
    category: "Animation",
    description: "Sets the delay before an animation starts — can be negative to begin partway through.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-delay: 200ms | 1s",
    mdnPath: "animation-delay",
    demo: createAnimationDelayDemo(),
    values: [
      {
        value: "0s",
        label: "No Delay (0s)",
        description: "The animation starts immediately without waiting. This is the default."
      },
      {
        value: "positive",
        label: "Positive Value (e.g., 1s, 2s)",
        description: "The animation waits for the specified time before starting. Useful for staggering multiple animations."
      },
      {
        value: "negative",
        label: "Negative Value (e.g., -500ms)",
        description: "The animation starts as if it had already been playing for that duration. The animation begins partway through its cycle."
      }
    ]
  },
  {
    name: "animation-direction",
    category: "Animation",
    description: "Controls whether the animation plays forwards, backwards, or alternates each cycle.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-direction: normal | reverse | alternate",
    mdnPath: "animation-direction",
    demo: createAnimationDirectionDemo(),
    values: [
      {
        value: "normal",
        label: "Normal",
        description: "The animation plays forwards from 0% to 100%. When it reaches the end, it restarts from the beginning. This is the default."
      },
      {
        value: "reverse",
        label: "Reverse",
        description: "The animation plays backwards from 100% to 0%. It starts at the last keyframe and ends at the first."
      },
      {
        value: "alternate",
        label: "Alternate",
        description: "The animation plays forwards first, then backwards. It alternates direction on each iteration."
      },
      {
        value: "alternate-reverse",
        label: "Alternate Reverse",
        description: "The animation plays backwards first, then forwards. It starts from the end and alternates on each iteration."
      }
    ]
  },
  {
    name: "animation-fill-mode",
    category: "Animation",
    description: "Controls how styles apply before/after animation — forwards keeps end state, backwards applies start state before delay.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-fill-mode: none | forwards | both",
    mdnPath: "animation-fill-mode",
    demo: createAnimationFillModeDemo(),
    values: [
      {
        value: "none",
        label: "None",
        description: "The animation styles don't affect the default state. Before the animation starts, the element uses its normal styles. After it ends, it returns to normal styles."
      },
      {
        value: "forwards",
        label: "Forwards",
        description: "After the animation completes, the final keyframe styles are retained. The element keeps the appearance of the last frame."
      },
      {
        value: "backwards",
        label: "Backwards",
        description: "Before the animation starts (during the delay period), the initial keyframe styles are applied. Useful with animation-delay."
      },
      {
        value: "both",
        label: "Both",
        description: "The animation applies the start styles before the animation begins and retains the end styles after it completes."
      }
    ]
  },
  {
    name: "animation-iteration-count",
    category: "Animation",
    description: "Sets how many times the animation plays — number or infinite for endless loop.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-iteration-count: 1 | 2 | infinite",
    mdnPath: "animation-iteration-count",
    demo: createAnimationIterationCountDemo(),
    values: [
      {
        value: "1",
        label: "Once (1)",
        description: "The animation plays through exactly one time. This is the default."
      },
      {
        value: "number",
        label: "Number (e.g., 2, 3)",
        description: "The animation plays the specified number of times. Use any positive number for precise control."
      },
      {
        value: "infinite",
        label: "Infinite",
        description: "The animation repeats forever without stopping. Commonly used for loading spinners and pulsing effects."
      }
    ]
  },
  {
    name: "animation-name",
    category: "Animation",
    description: "Specifies which @keyframes rule to use for the animation.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-name: fade-in | slide-up",
    mdnPath: "animation-name",
    demo: createAnimationNameDemo(),
    values: [
      {
        value: "none",
        label: "None",
        description: "No animation is played. This disables any animation on the element."
      },
      {
        value: "custom",
        label: "Custom Name (e.g., fadeIn, slideUp)",
        description: "References a @keyframes rule with the matching name. The browser looks for @keyframes fadeIn when you specify animation-name: fadeIn."
      }
    ]
  },
  {
    name: "animation-play-state",
    category: "Animation",
    description: "Controls whether the animation is running or paused — can be toggled to pause/resume.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-play-state: running | paused",
    mdnPath: "animation-play-state",
    demo: createAnimationPlayStateDemo(),
    values: [
      {
        value: "running",
        label: "Running",
        description: "The animation is actively playing. This is the default and the animation proceeds through its cycles."
      },
      {
        value: "paused",
        label: "Paused",
        description: "The animation is temporarily stopped. It freezes at its current state and resumes from where it left off when set back to running."
      }
    ]
  },
  {
    name: "animation-timing-function",
    category: "Animation",
    description: "Controls the speed curve of the animation — ease, linear, ease-in, ease-out, or custom cubic-bezier.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "animation-timing-function: ease | linear | cubic-bezier(0.4,0,0.2,1)",
    mdnPath: "animation-timing-function",
    demo: createAnimationTimingFunctionDemo(),
    values: [
      {
        value: "ease",
        label: "Ease",
        description: "Starts slowly, accelerates in the middle, then slows down at the end. The most natural-looking timing function."
      },
      {
        value: "ease-in",
        label: "Ease In",
        description: "Starts slowly and accelerates gradually until reaching the end. Good for elements that move out of view."
      },
      {
        value: "ease-out",
        label: "Ease Out",
        description: "Starts quickly and decelerates gradually at the end. Good for elements that come into view."
      },
      {
        value: "ease-in-out",
        label: "Ease In Out",
        description: "Like ease but with more pronounced acceleration and deceleration. Good for elements that move in and out."
      },
      {
        value: "linear",
        label: "Linear",
        description: "The animation maintains a constant speed from start to end. No acceleration or deceleration."
      },
      {
        value: "step-start",
        label: "Step Start",
        description: "Jumps instantly to the final state at the beginning of the animation. Like a sudden change."
      },
      {
        value: "step-end",
        label: "Step End",
        description: "Stays in the initial state until the very end, then jumps instantly to the final state."
      },
      {
        value: "steps()",
        label: "Steps (e.g., steps(4, end))",
        description: "Breaks the animation into equal steps. The state jumps between steps rather than transitioning smoothly."
      }
    ]
  },
  {
    name: "transition-behavior",
    category: "Animation",
    description: "Allows transitions on discrete properties like display — use allow-discrete to enable display:none transitions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2024",
    example: "transition-behavior: normal | allow-discrete",
    mdnPath: "transition-behavior",
    demo: createTransitionBehaviorDemo()
  },
  {
    name: "transition-property",
    category: "Animation",
    description: "Specifies which CSS properties should transition when their values change.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transition-property: opacity | transform | all",
    mdnPath: "transition-property",
    demo: createTransitionPropertyDemo(),
    values: [
      {
        value: "all",
        label: "All",
        description: "Every animatable property transitions when changed. This is the default but can impact performance."
      },
      {
        value: "none",
        label: "None",
        description: "No properties transition. Changes happen instantly without animation."
      },
      {
        value: "specific",
        label: "Specific Property (e.g., opacity, transform)",
        description: "Only the specified property animates. Best for performance—only transition what you need."
      }
    ]
  },
  {
    name: "transition-timing-function",
    category: "Animation",
    description: "Controls the acceleration curve of the transition — defines how intermediate values are calculated.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transition-timing-function: ease-in-out | linear",
    mdnPath: "transition-timing-function",
    demo: createTransitionTimingFunctionDemo(),
    values: [
      {
        value: "ease",
        label: "Ease",
        description: "Starts slowly, accelerates in the middle, then slows down at the end. The most natural-looking timing function."
      },
      {
        value: "ease-in",
        label: "Ease In",
        description: "Starts slowly and accelerates gradually until reaching the end. Good for elements that move out of view."
      },
      {
        value: "ease-out",
        label: "Ease Out",
        description: "Starts quickly and decelerates gradually at the end. Good for elements that come into view."
      },
      {
        value: "ease-in-out",
        label: "Ease In Out",
        description: "Like ease but with more pronounced acceleration and deceleration. Good for elements that move in and out."
      },
      {
        value: "linear",
        label: "Linear",
        description: "The animation maintains a constant speed from start to end. No acceleration or deceleration."
      },
      {
        value: "step-start",
        label: "Step Start",
        description: "Jumps instantly to the final state at the beginning of the animation. Like a sudden change."
      },
      {
        value: "step-end",
        label: "Step End",
        description: "Stays in the initial state until the very end, then jumps instantly to the final state."
      },
      {
        value: "steps()",
        label: "Steps (e.g., steps(4, end))",
        description: "Breaks the animation into equal steps. The state jumps between steps rather than transitioning smoothly."
      }
    ]
  }
];

// src/data/transform.ts
function createTransformDemo() {
  return `<div style="display:flex;gap:12px;align-items:center;padding:10px">
    <div style="background:#14b8a6;width:36px;height:36px;border-radius:4px;transform:rotate(20deg);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">rotate</div>
    <div style="background:#10b981;width:36px;height:36px;border-radius:4px;transform:scale(1.25);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">scale</div>
    <div style="background:#14b8a6;width:36px;height:36px;border-radius:4px;transform:skewX(-12deg);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">skew</div>
  </div>`;
}
function createTranslateDemo() {
  return `<div style="position:relative;height:72px;width:100%">
    <div style="position:absolute;left:20px;top:10px;background:#e0fdf4;border:2px dashed #14b8a6;width:36px;height:36px;border-radius:4px"></div>
    <div style="position:absolute;left:20px;top:10px;background:#14b8a6;width:36px;height:36px;border-radius:4px;translate:40px 16px;color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center">40px 16px</div>
  </div>`;
}
function createRotateDemo() {
  const items = [
    [0, 0.4],
    [30, 0.55],
    [60, 0.7],
    [90, 0.85],
    [135, 1]
  ];
  const boxes = items.map(([degrees, opacity]) => `<div style="width:28px;height:28px;background:#14b8a6;border-radius:3px;rotate:${degrees}deg;opacity:${opacity}"></div>`).join("");
  return `<div style="display:flex;gap:10px;align-items:center;padding:10px">${boxes}</div>`;
}
function createScaleDemo() {
  const items = [
    [".5", ".5x"],
    ["1", "1x"],
    ["1.3", "1.3x"],
    ["1.6", "1.6x"]
  ];
  const boxes = items.map(([scale, label]) => `<div style="width:28px;height:28px;background:#14b8a6;border-radius:3px;scale:${scale};display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">${label}</div>`).join("");
  return `<div style="display:flex;gap:12px;align-items:center;padding:14px">${boxes}</div>`;
}
function createTransformStyleDemo() {
  return `<div style="perspective:200px;padding:10px;display:flex;align-items:center;gap:12px">
    <div style="transform-style:preserve-3d;transform:rotateY(30deg) rotateX(10deg);width:48px;height:48px;position:relative">
      <div style="position:absolute;inset:0;background:#14b8a6;border-radius:4px;opacity:.9"></div>
      <div style="position:absolute;inset:6px;background:#0d9488;border-radius:3px;transform:translateZ(8px)"></div>
    </div>
    <p style="font-size:9px;font-weight:700;color:#888">preserve-3d<br>3D children</p>
  </div>`;
}
var transform = [
  {
    name: "transform",
    category: "Transform",
    description: "Applies 2D or 3D transformations — rotate, scale, translate, skew, and matrix.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transform: rotate(45deg) scale(1.2) translateX(20px)",
    mdnPath: "transform",
    demo: createTransformDemo()
  },
  {
    name: "translate",
    category: "Transform",
    description: "Individual transform property for moving an element, composable with rotate and scale.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "translate: 50px 100px | 50% | none",
    mdnPath: "translate",
    demo: createTranslateDemo()
  },
  {
    name: "rotate",
    category: "Transform",
    description: "Individual transform property for rotating an element without affecting other transforms.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "rotate: 45deg | 1 0 0 45deg | none",
    mdnPath: "rotate",
    demo: createRotateDemo()
  },
  {
    name: "scale",
    category: "Transform",
    description: "Individual transform property for scaling an element along X, Y, and Z axes.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "scale: 1.5 | 0.5 2 | none",
    mdnPath: "scale",
    demo: createScaleDemo()
  },
  {
    name: "transform-style",
    category: "Transform",
    description: "Sets whether children of a transformed element are positioned in 3D or flattened 2D space.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "transform-style: flat | preserve-3d",
    mdnPath: "transform-style",
    demo: createTransformStyleDemo()
  }
];

// src/data/spacing.ts
var spacing = [
  {
    name: "margin",
    category: "Spacing",
    description: "Sets outer spacing on all four sides. Use margin-top/right/bottom/left for individual sides, or margin-inline/margin-block for logical directions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin: auto | 1rem 2rem | 0 auto",
    mdnPath: "margin",
    demo: `<div style="padding:6px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px;width:190px"><div style="background:#84cc16;color:#fff;padding:6px;border-radius:3px;margin:10px 16px;font-size:10px;font-weight:700;text-align:center">margin: 10px 16px</div></div>`,
    values: [
      {
        value: "0",
        label: "Zero (0)",
        description: "Removes all margin. No space is added outside the element's border."
      },
      {
        value: "px/em/rem",
        label: "Fixed Values (e.g., 10px, 1rem)",
        description: "Adds a specific amount of space. em is relative to the element's font-size, rem is relative to root font-size."
      },
      {
        value: "%",
        label: "Percentage (e.g., 10%)",
        description: "Percentage is calculated based on the width of the containing block. Useful for responsive spacing."
      },
      {
        value: "auto",
        label: "Auto",
        description: "Browser calculates the margin. With horizontal centering, use margin: 0 auto to center a sized element."
      },
      {
        value: "negative",
        label: "Negative (e.g., -10px)",
        description: "Negative margins pull the element closer to adjacent elements. Can cause overlapping."
      },
      {
        value: "shorthand-1",
        label: "One Value (e.g., margin: 10px)",
        description: "Sets the same margin for all four sides."
      },
      {
        value: "shorthand-2",
        label: "Two Values (e.g., margin: 10px 20px)",
        description: "First value is top/bottom, second is right/left. Think of it as pairs: vertical, horizontal."
      },
      {
        value: "shorthand-3",
        label: "Three Values",
        description: "Top, right/left, bottom. Right and left share the same value."
      },
      {
        value: "shorthand-4",
        label: "Four Values",
        description: "Top, right, bottom, left. Goes clockwise starting from top. Remember: TRouBLe mnemonic."
      }
    ]
  },
  {
    name: "padding",
    category: "Spacing",
    description: "Sets inner spacing on all four sides. Use padding-top/right/bottom/left for individual sides, or padding-inline/padding-block for logical directions.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding: 1rem | 0.5rem 1rem 1.5rem",
    mdnPath: "padding",
    demo: `<div style="background:#f7fee7;border:3px solid #84cc16;border-radius:6px;padding:16px;width:180px;display:flex;align-items:center;justify-content:center"><div style="background:#84cc16;color:#fff;padding:6px 12px;border-radius:3px;font-size:10px;font-weight:700">content</div></div>`,
    values: [
      {
        value: "0",
        label: "Zero (0)",
        description: "Removes all padding. No space is added inside the element's border."
      },
      {
        value: "px/em/rem",
        label: "Fixed Values (e.g., 10px, 1rem)",
        description: "Adds space inside the element. Pushes content inward from the border edge."
      },
      {
        value: "%",
        label: "Percentage (e.g., 10%)",
        description: "Percentage is calculated based on the width of the element itself (not parent). Great for aspect ratios."
      },
      {
        value: "shorthand-1",
        label: "One Value",
        description: "Sets the same padding for all four sides."
      },
      {
        value: "shorthand-2",
        label: "Two Values",
        description: "First value is top/bottom, second is right/left."
      },
      {
        value: "shorthand-3",
        label: "Three Values",
        description: "Top, right/left, bottom. Right and left share the value."
      },
      {
        value: "shorthand-4",
        label: "Four Values",
        description: "Top, right, bottom, left. Goes clockwise from top."
      }
    ]
  },
  {
    name: "margin-inline",
    category: "Spacing",
    description: "Logical shorthand for margin-inline-start and margin-inline-end — adapts to writing direction (horizontal in LTR, vertical in vertical writing modes).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-inline: auto | 1rem | 2rem 4rem",
    mdnPath: "margin-inline",
    demo: `<div style="background:#f7fee7;border:2px dashed #84cc16;border-radius:6px;padding:8px;width:190px"><div style="background:#84cc16;color:#fff;padding:6px;border-radius:3px;margin-inline:auto;width:fit-content;font-size:10px;font-weight:700">margin-inline: auto</div></div>`
  },
  {
    name: "padding-block",
    category: "Spacing",
    description: "Logical shorthand for padding-block-start and padding-block-end — adapts to writing direction (vertical in LTR, horizontal in vertical writing modes).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-block: 1rem | 0.5rem 2rem",
    mdnPath: "padding-block",
    demo: `<div style="background:#f7fee7;border:3px solid #84cc16;border-radius:6px;padding-block:20px;padding-inline:10px;width:170px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2px"><div style="background:#84cc16;color:#fff;padding:5px 12px;border-radius:3px;font-size:10px;font-weight:700">content</div><p style="font-size:8px;color:#84cc16;font-weight:700">padding-block: 20px</p></div>`
  },
  {
    name: "margin-block",
    category: "Spacing",
    description: "Logical shorthand for margin-block-start and margin-block-end — adapts to writing direction (vertical in LTR, horizontal in vertical writing modes).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-block: auto | 1rem | 2rem 1rem",
    mdnPath: "margin-block",
    demo: `<div style="background:#f7fee7;border:2px dashed #84cc16;border-radius:6px;padding:8px;width:190px"><div style="background:#84cc16;color:#fff;padding:6px;border-radius:3px;margin-block:12px;font-size:10px;font-weight:700;text-align:center">margin-block: 12px</div></div>`
  },
  {
    name: "padding-inline",
    category: "Spacing",
    description: "Logical shorthand for padding-inline-start and padding-inline-end — adapts to writing direction (horizontal in LTR, vertical in vertical writing modes).",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-inline: 1rem | 0.5rem 2rem",
    mdnPath: "padding-inline",
    demo: `<div style="background:#f7fee7;border:3px solid #84cc16;border-radius:6px;padding-inline:24px;padding-block:10px;width:fit-content;display:flex;align-items:center;justify-content:center"><div style="background:#84cc16;color:#fff;padding:5px 12px;border-radius:3px;font-size:10px;font-weight:700">content</div></div>`
  }
];

// src/demo-helpers.ts
function toKebabCase(str) {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
function buildStyle(styles) {
  return Object.entries(styles).filter(([_, value]) => value !== undefined && value !== null && value !== "").map(([key, value]) => `${toKebabCase(key)}: ${value}`).join("; ");
}
function styledBox(content, options = {}) {
  const styles = {
    background: options.background || "#6366f1",
    color: options.color || "#fff",
    padding: options.padding || "8px",
    borderRadius: options.borderRadius || "4px",
    fontSize: options.fontSize,
    fontWeight: options.fontWeight || "700",
    cursor: options.cursor,
    width: options.width,
    height: options.height,
    textAlign: options.textAlign,
    border: options.border,
    display: options.display
  };
  for (const [key, value] of Object.entries(options)) {
    if (!(key in styles) && value !== undefined && value !== null && value !== "") {
      styles[key] = value;
    }
  }
  return `<div style="${buildStyle(styles)}">${content}</div>`;
}
function flexContainer(children, options = {}) {
  const styles = {
    display: "flex",
    flexDirection: options.direction || "row",
    gap: options.gap || "10px",
    padding: options.padding || "10px",
    alignItems: options.alignItems || "center",
    justifyContent: options.justifyContent,
    flexWrap: options.flexWrap,
    width: options.width,
    height: options.height,
    background: options.background,
    border: options.border,
    borderRadius: options.borderRadius
  };
  const content = Array.isArray(children) ? children.join("") : children;
  return `<div style="${buildStyle(styles)}">${content}</div>`;
}
function comparisonDemo(leftContent, rightContent, leftStyles, rightStyles, containerOptions) {
  return flexContainer([styledBox(leftContent, leftStyles), styledBox(rightContent, rightStyles)], containerOptions);
}

// src/data/interactivity.ts
var interactivity = [
  {
    name: "cursor",
    category: "Interactivity",
    description: "Sets the mouse cursor icon when hovering over an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "cursor: auto | pointer | text | grab | grabbing | not-allowed",
    mdnPath: "cursor",
    demo: flexContainer([
      ["pointer", "\uD83D\uDDB1️"],
      ["text", "I"],
      ["grab", "✋"],
      ["not-allowed", "\uD83D\uDEAB"]
    ].map(([c, i]) => styledBox(`${i} ${c}`, {
      cursor: c,
      background: "#fee2e2",
      border: "2px solid #ef4444",
      borderRadius: "4px",
      padding: "4px 8px",
      fontSize: "10px",
      fontWeight: "700",
      color: "#b91c1c"
    })), { flexWrap: "wrap", gap: "5px", padding: "8px" })
  },
  {
    name: "pointer-events",
    category: "Interactivity",
    description: "Controls whether an element can be the target of mouse and touch events.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "pointer-events: auto | none",
    mdnPath: "pointer-events",
    demo: comparisonDemo("auto ✓", "none ✗", {
      pointerEvents: "auto",
      background: "#dcfce7",
      border: "2px solid #ef4444",
      borderRadius: "5px",
      padding: "8px",
      fontSize: "10px",
      fontWeight: "700",
      color: "#15803d",
      cursor: "pointer"
    }, {
      pointerEvents: "none",
      background: "#fee2e2",
      border: "2px dashed #ef4444",
      borderRadius: "5px",
      padding: "8px",
      fontSize: "10px",
      fontWeight: "700",
      color: "#b91c1c",
      cursor: "not-allowed"
    }, { gap: "10px", padding: "10px" })
  },
  {
    name: "user-select",
    category: "Interactivity",
    description: "Controls whether and how the user can select text inside an element.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "user-select: auto | text | none | all | contain",
    mdnPath: "user-select",
    demo: flexContainer([
      styledBox("user-select: text — select me!", {
        userSelect: "text",
        fontSize: "11px",
        fontWeight: "700",
        color: "#111",
        background: "#dcfce7",
        padding: "4px 8px",
        borderRadius: "3px"
      }),
      styledBox("user-select: none — can't select", {
        userSelect: "none",
        fontSize: "11px",
        fontWeight: "700",
        color: "#888",
        background: "#fee2e2",
        padding: "4px 8px",
        borderRadius: "3px"
      })
    ], { direction: "column", gap: "6px", padding: "10px" })
  },
  {
    name: "scroll-snap-type",
    category: "Interactivity",
    description: "Enables scroll snapping on a container — mandatory or proximity snapping along an axis.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "scroll-snap-type: x mandatory | y proximity | both mandatory",
    mdnPath: "scroll-snap-type",
    demo: `<div style="display:flex;gap:0;overflow-x:scroll;scroll-snap-type:x mandatory;width:180px;border-radius:6px;scroll-behavior:smooth">${["#6366f1", "#ec4899", "#f97316", "#10b981"].map((c, i) => `<div style="flex-shrink:0;width:180px;height:68px;background:${c};scroll-snap-align:start;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700">Slide ${i + 1}</div>`).join("")}</div>`
  },
  {
    name: "overscroll-behavior",
    category: "Interactivity",
    description: "Controls scroll chaining — prevents overflow scroll propagating to parent elements.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: "overscroll-behavior: auto | contain | none",
    mdnPath: "overscroll-behavior",
    demo: flexContainer(styledBox(`<p style="font-size:9px;line-height:1.8;font-weight:700;color:#b91c1c">overscroll-behavior: contain — scroll doesn't chain to parent. Extra content here to enable scroll. More text.</p>`, {
      overscrollBehavior: "contain",
      height: "60px",
      overflowY: "scroll",
      width: "140px",
      background: "#fff0f0",
      border: "2px solid #ef4444",
      borderRadius: "5px",
      padding: "6px"
    }), { padding: "10px", gap: "10px" })
  },
  {
    name: "touch-action",
    category: "Interactivity",
    description: "Specifies which touch gestures are handled by the browser on a region.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "touch-action: auto | none | pan-x | pan-y | manipulation",
    mdnPath: "touch-action",
    demo: flexContainer([
      styledBox("pan-x only →", {
        touchAction: "pan-x",
        background: "#fee2e2",
        border: "2px solid #ef4444",
        borderRadius: "5px",
        padding: "8px",
        fontSize: "10px",
        fontWeight: "700",
        color: "#b91c1c"
      }),
      styledBox("manipulation", {
        touchAction: "manipulation",
        background: "#fef3c7",
        border: "2px solid #f59e0b",
        borderRadius: "5px",
        padding: "8px",
        fontSize: "10px",
        fontWeight: "700",
        color: "#b45309"
      })
    ], { gap: "8px", padding: "10px" })
  },
  {
    name: "scroll-behavior",
    category: "Interactivity",
    description: "Controls scrolling behavior — smooth enables animated scrolling, auto jumps instantly.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "scroll-behavior: auto | smooth",
    mdnPath: "scroll-behavior",
    demo: flexContainer(styledBox(`<p style="font-size:9px;font-weight:700;color:#b91c1c">scroll-behavior: smooth — animated scrolling</p><p style="font-size:9px;font-weight:700;color:#ef4444;margin-top:40px">target element ↓</p>`, {
      scrollBehavior: "smooth",
      overflowY: "scroll",
      height: "60px",
      background: "#fee2e2",
      border: "2px solid #ef4444",
      borderRadius: "5px",
      padding: "6px"
    }), { padding: "10px", direction: "column", gap: "6px" })
  },
  {
    name: "scroll-margin",
    category: "Interactivity",
    description: "Adds an offset around an element for scroll snapping and programmatic scroll positioning.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "scroll-margin-top: 1rem",
    mdnPath: "scroll-margin",
    demo: `<div style="padding:10px"><div style="display:flex;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;width:180px;border-radius:6px;border:2px solid #f97316">${[1, 2, 3].map((n) => `<div style="flex:0 0 180px;height:52px;background:${n === 2 ? "#fb923c" : "#fdba74"};scroll-snap-align:start;scroll-margin-inline:16px;display:flex;align-items:center;justify-content:center;color:#7c2d12;font-size:10px;font-weight:700">slide ${n}</div>`).join("")}</div><p style="font-size:9px;color:#888;font-weight:700;margin-top:4px">each slide has scroll-margin-inline: 16px</p></div>`
  },
  {
    name: "scroll-padding",
    category: "Interactivity",
    description: "Defines the snapport inset of a scrolling container for scroll snapping and anchor jumps.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "scroll-padding-inline: 1rem",
    mdnPath: "scroll-padding",
    demo: `<div style="padding:10px"><div style="display:flex;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:18px;width:180px;border-radius:6px;border:2px solid #0ea5e9">${[1, 2, 3].map((n) => `<div style="flex:0 0 160px;margin-right:8px;height:52px;background:${n === 2 ? "#0ea5e9" : "#7dd3fc"};scroll-snap-align:start;display:flex;align-items:center;justify-content:center;color:#082f49;font-size:10px;font-weight:700">card ${n}</div>`).join("")}</div><p style="font-size:9px;color:#888;font-weight:700;margin-top:4px">container uses scroll-padding-inline: 18px</p></div>`
  },
  {
    name: "scroll-snap-align",
    category: "Interactivity",
    description: "Sets each element's snap position inside a scroll container.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "scroll-snap-align: start | center | end",
    mdnPath: "scroll-snap-align",
    demo: `<div style="padding:10px"><div style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;width:180px;border-radius:6px;border:2px solid #8b5cf6">${[
      ["start", "#ddd6fe"],
      ["center", "#c4b5fd"],
      ["end", "#a78bfa"]
    ].map(([a, c]) => `<div style="flex:0 0 180px;height:56px;background:${c};scroll-snap-align:${a};display:flex;align-items:center;justify-content:center;color:#5b21b6;font-size:10px;font-weight:700">${a}</div>`).join("")}</div></div>`
  }
];

// src/data/css-variables.ts
var cssVariables = [
  {
    name: "Custom Properties",
    category: "CSS Variables",
    description: "User-defined CSS variables (--my-var: value) reusable anywhere via var(). The foundation of design token systems.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: `--brand: #6366f1;
--space: clamp(1rem, 2vw, 2rem);
color: var(--brand, black);`,
    mdnPath: "Using_CSS_custom_properties",
    demo: `<div style="--brand:#6366f1;--accent:#ec4899;--space:12px;padding:var(--space);display:flex;flex-direction:column;gap:6px"><div style="background:var(--brand);color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace">background: var(--brand)</div><div style="background:var(--accent);color:#fff;padding:5px 10px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace">background: var(--accent)</div></div>`
  },
  {
    name: "var()",
    category: "CSS Variables",
    description: "Reads a custom property value and optionally provides a fallback when the variable is missing.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "color: var(--brand, #111)",
    mdnPath: "var",
    demo: `<div style="--brand:#2563eb;padding:10px;display:flex;flex-direction:column;gap:6px"><div style="background:var(--brand);color:#fff;padding:6px 10px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace">var(--brand)</div><div style="background:var(--missing,#10b981);color:#fff;padding:6px 10px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace">var(--missing, #10b981)</div></div>`
  },
  {
    name: "@property",
    category: "CSS Variables",
    description: "Registers a custom property with a type, initial value, and inheritance — enables animation of custom properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2024",
    example: `@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}`,
    mdnPath: "@property",
    demo: `<style>@property --hue{syntax:"<number>";inherits:false;initial-value:0}@keyframes hue-spin{to{--hue:360}}.prop-demo{animation:hue-spin 3s linear infinite;background:hsl(var(--hue) 80% 60%)}</style><div style="display:flex;align-items:center;gap:12px;padding:10px"><div class="prop-demo" style="width:52px;height:52px;border-radius:50%"></div><p style="font-size:10px;font-weight:700;color:#3b82f6;font-family:monospace">@property --hue<br>animates hue 0→360</p></div>`
  },
  {
    name: "env()",
    category: "CSS Variables",
    description: "Inserts a user-agent environment variable such as safe-area-inset for notched devices.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-top: env(safe-area-inset-top)",
    mdnPath: "env",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div style="background:#dbeafe;border:2px solid #3b82f6;border-radius:5px;padding:6px"><p style="font-size:10px;font-weight:700;color:#1d4ed8;font-family:monospace">padding-top:</p><p style="font-size:10px;font-weight:700;color:#1d4ed8;font-family:monospace">env(safe-area-inset-top)</p></div><p style="font-size:9px;color:#888;font-weight:700">Respects device notch/island</p></div>`
  }
];

// src/data/queries.ts
function createMediaDemo() {
  return `<style>.q-media{display:grid;grid-template-columns:1fr;gap:4px}.q-media .cell{background:#c084fc;height:24px;border-radius:3px}@media (min-width: 720px){.q-media{grid-template-columns:repeat(3,1fr)}.q-media .cell{background:#a855f7}}</style><div style="padding:8px"><div class="q-media"><div class="cell"></div><div class="cell"></div><div class="cell"></div></div><div style="font-size:9px;color:#888;font-weight:700;text-align:center;margin-top:4px">Resize viewport to trigger @media</div></div>`;
}
function createContainerDemo2() {
  return `<style>.q-card-wrap{container-type:inline-size;container-name:card}.q-card{display:flex;flex-direction:column;gap:4px}.q-card .piece{background:#c084fc;color:#fff;padding:5px;border-radius:3px;font-size:9px;font-weight:700;text-align:center}@container card (min-width: 180px){.q-card{flex-direction:row}.q-card .piece{background:#a855f7}}</style><div class="q-card-wrap" style="width:190px;border:2px solid #a855f7;border-radius:6px;padding:8px;background:#faf5ff"><div class="q-card"><div class="piece">responsive</div><div class="piece">container</div></div></div>`;
}
function createLayerDemo() {
  return `<style>@layer q-base, q-theme; @layer q-base {.q-layer-tag{background:#e9d5ff;color:#6d28d9}} @layer q-theme {.q-layer-tag{background:#8b5cf6;color:#fff}}</style><div style="padding:8px"><div class="q-layer-tag" style="padding:6px 10px;border-radius:3px;font-size:10px;font-weight:700;font-family:monospace">@layer q-theme overrides q-base</div></div>`;
}
function createSupportsDemo() {
  return `<style>.q-support-box{padding:6px;border-radius:4px;font-size:10px;font-weight:700;font-family:monospace}@supports (display:grid){.q-support-ok{background:#dcfce7;border:2px solid #16a34a;color:#15803d}}@supports not (display:grid){.q-support-ok{background:#fee2e2;border:2px solid #dc2626;color:#b91c1c}}</style><div style="padding:10px"><div class="q-support-box q-support-ok">@supports (display:grid)</div></div>`;
}
function createHasDemo() {
  return `<style>.q-has{border:2px solid #94a3b8;border-radius:5px;padding:6px;background:#f8fafc}.q-has:has(input:checked){border-color:#16a34a;background:#f0fdf4}.q-has:has(input:not(:checked)){border-color:#dc2626;background:#fff0f0}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><label class="q-has" style="display:flex;align-items:center;gap:6px"><input type="checkbox" aria-label="Checked checkbox" checked><span style="font-size:10px;font-weight:700">checked parent</span></label><label class="q-has" style="display:flex;align-items:center;gap:6px"><input type="checkbox" aria-label="Unchecked checkbox"><span style="font-size:10px;font-weight:700">unchecked parent</span></label></div>`;
}
function createIsDemo() {
  return `<style>.q-is :is(h1,h2,h3){margin:0;color:#a855f7}.q-is h1{font-size:14px}.q-is h2{font-size:12px}.q-is h3{font-size:11px}</style><div class="q-is" style="padding:10px;display:flex;flex-direction:column;gap:4px"><h1>h1 via :is()</h1><h2>h2 via :is()</h2><h3>h3 via :is()</h3></div>`;
}
function createWhereDemo() {
  return `<style>.q-where :where(.chip){color:#6366f1;background:#eef2ff}.q-where .chip.override{color:#fff;background:#8b5cf6}</style><div class="q-where" style="padding:10px;display:flex;gap:6px"><div class="chip" style="padding:5px 8px;border-radius:4px;font-size:10px;font-weight:700">default via :where</div><div class="chip override" style="padding:5px 8px;border-radius:4px;font-size:10px;font-weight:700">easy override</div></div>`;
}
function createNotDemo() {
  return `<style>.q-not .item{padding:5px 10px;border-radius:3px;font-size:10px;font-weight:700;background:#e9d5ff;color:#6b21a8}.q-not .item:not(:last-child){background:#a855f7;color:#fff}</style><div class="q-not" style="display:flex;flex-direction:column;gap:4px;padding:8px;width:100%"><div class="item">first</div><div class="item">second</div><div class="item">last</div></div>`;
}
function createScopeDemo() {
  return `<style>@scope (.q-scope-card){.q-title{color:#15803d;font-weight:800}}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div class="q-scope-card" style="padding:8px;border:2px solid #16a34a;border-radius:6px"><p class="q-title" style="margin:0;font-size:10px">scoped title</p></div><div style="padding:8px;border:2px solid #cbd5e1;border-radius:6px"><p class="q-title" style="margin:0;font-size:10px;color:#64748b">outside scope</p></div></div>`;
}
function createStartingStyleDemo() {
  return `<style>.q-start{opacity:1;transform:scale(1);transition:opacity .35s ease,transform .35s ease}@starting-style{.q-start{opacity:0;transform:scale(.9)}}</style><div style="padding:10px"><div class="q-start" style="background:#fef3c7;border:2px solid #eab308;border-radius:6px;padding:8px;font-size:10px;font-weight:700;color:#a16207">Entry transition with @starting-style</div></div>`;
}
var queries = [
  {
    name: "@media",
    category: "Queries",
    description: "Applies styles conditionally based on media features like viewport width, orientation, or color scheme.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: `@media (min-width: 48rem) { .grid { columns: 2 } }
@media (prefers-color-scheme: dark) { ... }`,
    mdnPath: "@media",
    demo: createMediaDemo()
  },
  {
    name: "@container",
    category: "Queries",
    description: "Applies styles based on the size of a named container element — the key to truly modular components.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: "@container card (min-width: 30em) { .title { font-size: 2rem } }",
    mdnPath: "@container",
    demo: createContainerDemo2()
  },
  {
    name: "@layer",
    category: "Queries",
    description: "Declares a cascade layer, giving explicit control over specificity order.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2022",
    example: `@layer utilities { .flex { display: flex } }
@layer base, theme, utilities`,
    mdnPath: "@layer",
    demo: createLayerDemo()
  },
  {
    name: "@supports",
    category: "Queries",
    description: "Applies styles conditionally when the browser supports a given CSS feature.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "@supports (display: grid) { .layout { display: grid } }",
    mdnPath: "@supports",
    demo: createSupportsDemo()
  },
  {
    name: ":has()",
    category: "Queries",
    description: "A parent selector — styles an element based on whether it contains a specific descendant or state.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "b2023",
    example: `form:has(:invalid) { border-color: red; }
li:has(+ li) { margin-bottom: 1rem; }`,
    mdnPath: ":has",
    demo: createHasDemo()
  },
  {
    name: ":is()",
    category: "Queries",
    description: "Matches any element matching at least one of the given selectors. Adopts the highest specificity in the list.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: ":is(h1, h2, h3) { margin-block: 1.5rem }",
    mdnPath: ":is",
    demo: createIsDemo()
  },
  {
    name: ":where()",
    category: "Queries",
    description: "Like :is() but with zero specificity — ideal for low-priority defaults that are easy to override.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: ":where(header, footer) a { color: inherit }",
    mdnPath: ":where",
    demo: createWhereDemo()
  },
  {
    name: ":not()",
    category: "Queries",
    description: "Selects elements that do NOT match any of the provided selectors.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: `li:not(:last-child) { margin-bottom: 0.5rem }
button:not([disabled]) { ... }`,
    mdnPath: ":not",
    demo: createNotDemo()
  },
  {
    name: "@scope",
    category: "Queries",
    description: "Creates scoped styles that only apply within a specific DOM subtree — limits selector reach. Chrome 118+, Safari TP.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: "@scope (.card) { .title { color: blue } }",
    mdnPath: "@scope",
    demo: createScopeDemo()
  },
  {
    name: "@starting-style",
    category: "Queries",
    description: "Defines styles for the starting state of elements entering the DOM — essential for entry animations. Chrome 117+.",
    support: { ch: 1, ff: 0, sf: 1, ed: 1 },
    interop: "b2024",
    example: "@starting-style { dialog { opacity: 0; transform: scale(0) } }",
    mdnPath: "@starting-style",
    demo: createStartingStyleDemo()
  }
];

// src/data/selectors.ts
function createHoverDemo() {
  return `<style>.sel-hover-btn{padding:8px 16px;background:#3b82f6;color:#fff;border:none;border-radius:4px;font-size:11px;font-weight:700;transition:background .2s}.sel-hover-btn:hover{background:#1d4ed8}</style><div style="padding:10px"><button class="sel-hover-btn">:hover me</button></div>`;
}
function createFocusDemo() {
  return `<style>.sel-focus{padding:6px 10px;border:2px solid #cbd5e1;border-radius:4px;font-size:11px;outline:none}.sel-focus:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.2)}</style><div style="padding:10px"><input aria-label="Focus demo input" class="sel-focus" type="text" placeholder="Click or tab here"></div>`;
}
function createFocusVisibleDemo() {
  return `<style>.sel-fv{padding:8px 16px;background:#10b981;color:#fff;border:none;border-radius:4px;font-size:11px;font-weight:700}.sel-fv:focus-visible{outline:3px solid #064e3b;outline-offset:2px}</style><div style="padding:10px"><button class="sel-fv">Tab to focus</button></div>`;
}
function createFocusWithinDemo() {
  return `<style>.sel-fw{padding:12px;border:2px solid #e2e8f0;border-radius:6px;transition:all .2s}.sel-fw:focus-within{border-color:#8b5cf6;background:#f5f3ff}</style><div style="padding:10px"><div class="sel-fw"><p style="font-size:10px;font-weight:700;color:#64748b;margin:0 0 6px">Container</p><input aria-label="Focus within demo input" type="text" placeholder="Focus me" style="padding:5px 8px;border:1px solid #cbd5e1;border-radius:3px;font-size:10px;width:120px"></div></div>`;
}
function createActiveDemo() {
  return `<style>.sel-active{padding:8px 16px;background:#ef4444;color:#fff;border:none;border-radius:4px;font-size:11px;font-weight:700;transition:transform .1s}.sel-active:active{transform:scale(.95)}</style><div style="padding:10px"><button class="sel-active">Hold click</button></div>`;
}
function createDisabledDemo() {
  return `<div style="padding:10px;display:flex;gap:8px;flex-direction:column"><button disabled style="padding:6px 12px;background:#e2e8f0;color:#94a3b8;border:none;border-radius:4px;font-size:10px;font-weight:700;cursor:not-allowed">Disabled button</button><input aria-label="Disabled input" disabled value="Disabled input" style="padding:5px 8px;background:#f1f5f9;color:#94a3b8;border:1px solid #e2e8f0;border-radius:3px;font-size:10px;width:130px"></div>`;
}
function createCheckedDemo() {
  return `<style>.sel-check input:checked + span{color:#065f46;font-weight:800}</style><div style="padding:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><label class="sel-check" style="display:flex;align-items:center;gap:6px;font-size:11px;color:#374151"><input aria-label="Checked checkbox" type="checkbox" checked style="accent-color:#10b981;width:16px;height:16px"><span>Checked</span></label><label class="sel-check" style="display:flex;align-items:center;gap:6px;font-size:11px;color:#374151"><input aria-label="Selected radio" type="radio" checked name="sel-radio" style="accent-color:#6366f1;width:16px;height:16px"><span>Selected</span></label></div>`;
}
function createValidInvalidDemo() {
  return `<style>.sel-valid{padding:6px 10px;border:2px solid #cbd5e1;border-radius:4px;font-size:10px;width:150px}.sel-valid:valid{border-color:#22c55e;color:#15803d}.sel-valid:invalid{border-color:#ef4444;color:#b91c1c}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><input aria-label="Valid email" class="sel-valid" type="email" value="valid@email.com" required><input aria-label="Invalid email" class="sel-valid" type="email" value="invalid-email" required></div>`;
}
function createRequiredDemo() {
  return `<style>.sel-req input{padding:5px 8px;border:1px solid #cbd5e1;border-radius:3px;font-size:10px;width:120px}.sel-req input:required{border-left:3px solid #3b82f6}</style><div class="sel-req" style="padding:10px;display:flex;flex-direction:column;gap:6px"><label style="font-size:10px;font-weight:700;color:#374151">Name (required) <input aria-label="Required name input" required></label><label style="font-size:10px;font-weight:700;color:#374151">Bio (optional) <input aria-label="Optional bio input"></label></div>`;
}
function createPlaceholderShownDemo() {
  return `<style>.sel-ph{padding:6px 10px;border:2px solid #10b981;border-radius:4px;font-size:10px;width:150px}.sel-ph:placeholder-shown{font-style:italic;color:#8b5cf6;border-color:#8b5cf6}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><input aria-label="Placeholder shown input" class="sel-ph" placeholder="Type something..."><input aria-label="Value present input" class="sel-ph" value="Has value"></div>`;
}
function createReadOnlyWriteDemo() {
  return `<style>.sel-rw{padding:6px 10px;border:2px solid #cbd5e1;border-radius:4px;font-size:10px;width:150px}.sel-rw:read-only{background:#f3f4f6;border-color:#94a3b8;color:#475569}.sel-rw:read-write{background:#ecfeff;border-color:#06b6d4;color:#0e7490}</style><div style="padding:10px;display:flex;flex-direction:column;gap:6px"><input aria-label="Read-only input" class="sel-rw" value="read-only" readonly><input aria-label="Read-write input" class="sel-rw" value="read-write"></div>`;
}
function createNthChildDemo() {
  return `<style>.sel-nc li{padding:5px 8px;border-radius:3px;font-size:10px;font-weight:700;text-align:center;border:1px solid #e2e8f0;background:#f8fafc;color:#64748b}.sel-nc li:nth-child(2n){background:#e0e7ff;color:#4338ca;border-color:#6366f1}</style><div style="padding:10px"><ul class="sel-nc" style="display:flex;flex-direction:column;gap:3px;width:140px;list-style:none;padding:0;margin:0"><li>1</li><li>2 (even)</li><li>3</li><li>4 (even)</li><li>5</li></ul></div>`;
}
function createNthOfTypeDemo() {
  return `<style>.sel-not p{margin:0;padding:4px 8px;border-radius:3px;font-size:9px}.sel-not p:nth-of-type(2){background:#fef3c7;color:#92400e;font-weight:800}</style><div class="sel-not" style="padding:10px;display:flex;flex-direction:column;gap:3px;width:160px"><div style="padding:4px 8px;font-size:9px;background:#f1f5f9;color:#64748b;border-radius:3px">div sibling</div><p style="background:#e0e7ff;color:#4338ca">p first of type</p><div style="padding:4px 8px;font-size:9px;background:#f1f5f9;color:#64748b;border-radius:3px">div sibling</div><p>p second of type</p></div>`;
}
function createFirstChildDemo() {
  return `<style>.sel-first div:first-child{background:#10b981;color:#fff}</style><div class="sel-first" style="padding:10px;display:flex;gap:4px"><div style="padding:6px 10px;border-radius:4px;font-size:10px;font-weight:700;background:#e2e8f0;color:#64748b">first-child</div><div style="padding:6px 10px;background:#e2e8f0;color:#64748b;border-radius:4px;font-size:10px;font-weight:700">item</div><div style="padding:6px 10px;background:#e2e8f0;color:#64748b;border-radius:4px;font-size:10px;font-weight:700">item</div></div>`;
}
function createLastChildDemo() {
  return `<style>.sel-last div:last-child{background:#ec4899;color:#fff}</style><div class="sel-last" style="padding:10px;display:flex;gap:4px"><div style="padding:6px 10px;background:#e2e8f0;color:#64748b;border-radius:4px;font-size:10px;font-weight:700">item</div><div style="padding:6px 10px;background:#e2e8f0;color:#64748b;border-radius:4px;font-size:10px;font-weight:700">item</div><div style="padding:6px 10px;background:#e2e8f0;color:#64748b;border-radius:4px;font-size:10px;font-weight:700">last-child</div></div>`;
}
function createOnlyChildDemo() {
  return `<style>.sel-only .single p:only-child{font-weight:800;color:#166534}.sel-only .multi p:only-child{font-weight:800;color:#166534}</style><div class="sel-only" style="padding:10px;display:flex;gap:12px"><div class="single" style="padding:10px;background:#dcfce7;border:2px solid #22c55e;border-radius:6px;width:80px"><p style="margin:0;font-size:10px;text-align:center">only child</p></div><div class="multi" style="padding:10px;background:#fee2e2;border:2px solid #ef4444;border-radius:6px;width:80px"><p style="margin:0 0 4px;font-size:9px;color:#b91c1c">has sibling</p><p style="margin:0;font-size:9px;color:#b91c1c">not only</p></div></div>`;
}
function createEmptyDemo() {
  return `<style>.sel-empty .box{padding:8px 12px;border:2px dashed #f59e0b;border-radius:4px;width:70px;height:20px}.sel-empty .box:empty{background:#fef3c7}</style><div class="sel-empty" style="padding:10px;display:flex;gap:12px;align-items:center"><div class="box"></div><p style="font-size:10px;font-weight:700;color:#b45309">:empty matched</p></div>`;
}
function createRootDemo() {
  return `<div style="padding:10px"><div style="padding:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:6px;color:#fff"><p style="margin:0 0 4px;font-size:11px;font-weight:700">:root</p><p style="margin:0;font-size:9px;opacity:.9">&lt;html&gt; element</p><p style="margin:6px 0 0;font-size:9px;font-family:monospace;background:rgba(255,255,255,.2);padding:4px;border-radius:3px">--primary: #6366f1</p></div></div>`;
}
function createTargetDemo() {
  return `<style>#sel-target-demo:target{background:#fef3c7;border-color:#eab308}</style><div style="padding:10px"><a href="#sel-target-demo" style="font-size:10px;font-weight:700;color:#2563eb">Activate :target</a><div id="sel-target-demo" style="margin-top:6px;padding:10px;background:#f8fafc;border:2px solid #cbd5e1;border-radius:6px"><p style="margin:0;font-size:9px;color:#64748b">Target block</p></div></div>`;
}
var selectors = [
  {
    name: ":hover",
    category: "Selectors",
    description: "Matches when the user designates an element with a pointing device but does not necessarily activate it.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "a:hover { color: red }",
    mdnPath: ":hover",
    demo: createHoverDemo()
  },
  {
    name: ":focus",
    category: "Selectors",
    description: "Matches when an element has received focus — typically via keyboard navigation or click.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "input:focus { outline: 2px solid blue }",
    mdnPath: ":focus",
    demo: createFocusDemo()
  },
  {
    name: ":focus-visible",
    category: "Selectors",
    description: "Matches when an element has focus and the browser would display a focus indicator.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "button:focus-visible { outline: 2px solid blue }",
    mdnPath: ":focus-visible",
    demo: createFocusVisibleDemo()
  },
  {
    name: ":focus-within",
    category: "Selectors",
    description: "Matches when an element or any of its descendants have focus — useful for styling parent containers.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "form:focus-within { box-shadow: 0 0 0 3px blue }",
    mdnPath: ":focus-within",
    demo: createFocusWithinDemo()
  },
  {
    name: ":active",
    category: "Selectors",
    description: "Matches when an element is being activated by the user — mouse down or key press.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "button:active { transform: scale(0.98) }",
    mdnPath: ":active",
    demo: createActiveDemo()
  },
  {
    name: ":disabled",
    category: "Selectors",
    description: "Matches disabled form elements — inputs, buttons, select, textarea that cannot be interacted with.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "input:disabled { opacity: 0.5 }",
    mdnPath: ":disabled",
    demo: createDisabledDemo()
  },
  {
    name: ":checked",
    category: "Selectors",
    description: "Matches checkboxes, radio buttons, and option elements that are checked or selected.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "input:checked { accent-color: green }",
    mdnPath: ":checked",
    demo: createCheckedDemo()
  },
  {
    name: ":valid / :invalid",
    category: "Selectors",
    description: "Matches form elements whose content validates or fails validation according to constraints.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "input:valid { border-color: green } input:invalid { border-color: red }",
    mdnPath: ":valid",
    demo: createValidInvalidDemo()
  },
  {
    name: ":required",
    category: "Selectors",
    description: "Matches form elements that have the required attribute set.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "input:required { border-left: 3px solid red }",
    mdnPath: ":required",
    demo: createRequiredDemo()
  },
  {
    name: ":placeholder-shown",
    category: "Selectors",
    description: "Matches input elements that are currently displaying placeholder text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "input:placeholder-shown { font-style: italic }",
    mdnPath: ":placeholder-shown",
    demo: createPlaceholderShownDemo()
  },
  {
    name: ":read-only / :read-write",
    category: "Selectors",
    description: "Matches fields that are read-only versus editable — useful for form state styling.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: `input:read-only { background: #f3f4f6 }
input:read-write { background: #ecfeff }`,
    mdnPath: ":read-only",
    demo: createReadOnlyWriteDemo()
  },
  {
    name: ":nth-child()",
    category: "Selectors",
    description: "Matches elements based on their position among siblings — supports formulas like 2n+1, even, odd.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "li:nth-child(2n) { background: #f0f0f0 }",
    mdnPath: ":nth-child",
    demo: createNthChildDemo()
  },
  {
    name: ":nth-of-type()",
    category: "Selectors",
    description: "Matches elements of a specific type based on their position among siblings of the same type.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "p:nth-of-type(2) { font-weight: bold }",
    mdnPath: ":nth-of-type",
    demo: createNthOfTypeDemo()
  },
  {
    name: ":first-child",
    category: "Selectors",
    description: "Matches an element that is the first child of its parent.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "li:first-child { margin-top: 0 }",
    mdnPath: ":first-child",
    demo: createFirstChildDemo()
  },
  {
    name: ":last-child",
    category: "Selectors",
    description: "Matches an element that is the last child of its parent.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "li:last-child { border-bottom: none }",
    mdnPath: ":last-child",
    demo: createLastChildDemo()
  },
  {
    name: ":only-child",
    category: "Selectors",
    description: "Matches an element that has no siblings — it is the only child of its parent.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "p:only-child { text-align: center }",
    mdnPath: ":only-child",
    demo: createOnlyChildDemo()
  },
  {
    name: ":empty",
    category: "Selectors",
    description: "Matches elements that have no children — no text, no elements, completely empty.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "div:empty { display: none }",
    mdnPath: ":empty",
    demo: createEmptyDemo()
  },
  {
    name: ":root",
    category: "Selectors",
    description: "Matches the root element of the document — in HTML this is always the <html> element. Ideal for CSS variables.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: ":root { --primary: #6366f1 }",
    mdnPath: ":root",
    demo: createRootDemo()
  },
  {
    name: ":target",
    category: "Selectors",
    description: "Matches the unique element whose id matches the URL fragment identifier — for in-page navigation.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "section:target { background: yellow }",
    mdnPath: ":target",
    demo: createTargetDemo()
  }
];

// src/data/ui-components.ts
var uiComponents = [
  {
    name: "popover",
    category: "UI Components",
    description: "Native popover API attribute — creates a popover that can be shown/hidden via invoker buttons.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: `<div popover id="menu">...</div>
<button popovertarget="menu">Toggle</button>`,
    mdnPath: "popover",
    demo: `<div style="padding:10px"><button popovertarget="demo-popover-1" style="padding:8px 16px;background:#6366f1;color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:700">Toggle Popover</button><div id="demo-popover-1" popover style="padding:10px 12px;border:2px solid #6366f1;border-radius:6px;font-size:10px;font-weight:700;color:#4338ca">Popover content</div></div>`
  },
  {
    name: "popovertarget",
    category: "UI Components",
    description: "Button attribute that controls which popover to show/hide — references the popover element by ID.",
    support: { ch: 1, ff: 0, sf: 0, ed: 1 },
    interop: "ltd",
    example: `<button popovertarget="menu">Open</button>
<button popovertarget="menu" popovertargetaction="hide">Close</button>`,
    mdnPath: "popovertarget",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;gap:8px"><button popovertarget="demo-popover-2" popovertargetaction="show" style="padding:6px 12px;background:#10b981;color:#fff;border:none;border-radius:4px;font-size:10px;font-weight:700">Open</button><button popovertarget="demo-popover-2" popovertargetaction="hide" style="padding:6px 12px;background:#ef4444;color:#fff;border:none;border-radius:4px;font-size:10px;font-weight:700">Close</button></div><div id="demo-popover-2" popover style="padding:8px 10px;border:2px solid #10b981;border-radius:6px;font-size:10px;font-weight:700;color:#065f46">Controlled by popovertarget</div></div>`
  },
  {
    name: "command",
    category: "UI Components",
    description: "Invoker command attribute — declarative way for buttons to invoke built-in or custom commands on elements.",
    support: { ch: 1, ff: 0, sf: 0, ed: 0 },
    interop: "exp",
    example: '<button command="show-modal" commandfor="dialog">Open</button>',
    mdnPath: "command",
    demo: `<div style="padding:10px"><div style="background:#f0f9ff;border:2px solid #0ea5e9;border-radius:6px;padding:10px"><p style="font-size:10px;font-weight:700;color:#0284c7;margin:0">Experimental</p><p style="font-size:9px;color:#0ea5e9;margin:4px 0 0;font-family:monospace">command="show-modal"</p></div><p style="font-size:8px;color:#888;margin-top:6px;font-weight:700">Invoker Commands API</p></div>`
  },
  {
    name: "commandfor",
    category: "UI Components",
    description: "Specifies the target element ID for a command invocation — links button to the element it controls.",
    support: { ch: 1, ff: 0, sf: 0, ed: 0 },
    interop: "exp",
    example: '<button command="hide-popover" commandfor="tooltip">Dismiss</button>',
    mdnPath: "commandfor",
    demo: `<div style="padding:10px"><div style="background:#f0f9ff;border:2px solid #0ea5e9;border-radius:6px;padding:10px"><p style="font-size:10px;font-weight:700;color:#0284c7;margin:0">Target Element</p><p style="font-size:9px;color:#0ea5e9;margin:4px 0 0;font-family:monospace">commandfor="dialog-id"</p></div><p style="font-size:8px;color:#888;margin-top:6px;font-weight:700">Links command to element</p></div>`
  },
  {
    name: "appearance",
    category: "UI Components",
    description: "Controls the platform-native styling of form elements — use none to fully customize with CSS.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "appearance: auto | none",
    mdnPath: "appearance",
    demo: `<div style="padding:10px;display:flex;gap:10px;align-items:center"><input type="checkbox" aria-label="Unchecked checkbox" style="appearance:none;width:24px;height:24px;border:2px solid #6366f1;border-radius:4px;background:#fff;position:relative"><input type="checkbox" checked aria-label="Checked checkbox" style="appearance:none;width:24px;height:24px;border:2px solid #6366f1;border-radius:4px;background:#6366f1;position:relative"><span style="font-size:9px;font-weight:700;color:#4338ca">appearance: none</span></div>`
  }
];

// src/data/tables.ts
var tables = [
  {
    name: "table-layout",
    category: "Tables",
    description: "Defines the algorithm used to lay out table columns: auto measures content, fixed uses first row and explicit widths.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "table-layout: auto | fixed",
    mdnPath: "table-layout",
    demo: `<div style="padding:10px;display:flex;gap:8px"><table style="table-layout:auto;width:92px;border-collapse:collapse;font-size:8px"><tr><th style="border:1px solid #cbd5e1;padding:2px">auto</th><th style="border:1px solid #cbd5e1;padding:2px">long content</th></tr><tr><td style="border:1px solid #cbd5e1;padding:2px">A</td><td style="border:1px solid #cbd5e1;padding:2px">very long text</td></tr></table><table style="table-layout:fixed;width:92px;border-collapse:collapse;font-size:8px"><tr><th style="border:1px solid #cbd5e1;padding:2px">fixed</th><th style="border:1px solid #cbd5e1;padding:2px">col</th></tr><tr><td style="border:1px solid #cbd5e1;padding:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">A</td><td style="border:1px solid #cbd5e1;padding:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">very long text</td></tr></table></div>`
  },
  {
    name: "border-collapse",
    category: "Tables",
    description: "Determines whether table borders are collapsed into a single border or rendered separately.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-collapse: collapse | separate",
    mdnPath: "border-collapse",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:collapse;font-size:8px"><tr><td style="border:2px solid #6366f1;padding:4px">collapse</td><td style="border:2px solid #6366f1;padding:4px">collapse</td></tr></table><table style="border-collapse:separate;border-spacing:4px;font-size:8px"><tr><td style="border:2px solid #ec4899;padding:4px">separate</td><td style="border:2px solid #ec4899;padding:4px">separate</td></tr></table></div>`
  },
  {
    name: "border-spacing",
    category: "Tables",
    description: "Sets the distance between table cell borders when border-collapse is separate.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-spacing: 0 | 8px 4px",
    mdnPath: "border-spacing",
    demo: `<div style="padding:10px"><table style="border-collapse:separate;border-spacing:8px 4px;font-size:8px"><tr><td style="border:2px solid #0ea5e9;padding:4px">1</td><td style="border:2px solid #0ea5e9;padding:4px">2</td></tr><tr><td style="border:2px solid #0ea5e9;padding:4px">3</td><td style="border:2px solid #0ea5e9;padding:4px">4</td></tr></table></div>`
  }
];

// src/data/lists.ts
var lists = [
  {
    name: "list-style",
    category: "Lists",
    description: "Shorthand for list-style-type, list-style-position, and list-style-image.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style: square inside",
    mdnPath: "list-style",
    demo: `<div style="padding:10px"><ul style="list-style:square inside;margin:0;padding:0;display:flex;flex-direction:column;gap:3px;font-size:10px;font-weight:700;color:#374151"><li>First item</li><li>Second item</li><li>Third item</li></ul></div>`
  },
  {
    name: "list-style-type",
    category: "Lists",
    description: "Sets the marker type for list items: disc, circle, square, decimal, and many language-specific counters.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style-type: disc | circle | square | decimal",
    mdnPath: "list-style-type",
    demo: `<div style="padding:10px;display:flex;gap:10px"><ul style="list-style-type:disc;margin:0;padding-left:14px;font-size:9px;font-weight:700"><li>disc</li><li>disc</li></ul><ul style="list-style-type:square;margin:0;padding-left:14px;font-size:9px;font-weight:700"><li>square</li><li>square</li></ul><ol style="list-style-type:decimal;margin:0;padding-left:14px;font-size:9px;font-weight:700"><li>decimal</li><li>decimal</li></ol></div>`
  },
  {
    name: "list-style-position",
    category: "Lists",
    description: "Controls whether list markers are inside or outside the content flow of list items.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style-position: inside | outside",
    mdnPath: "list-style-position",
    demo: `<div style="padding:10px;display:flex;gap:10px"><ul style="list-style-position:inside;list-style-type:disc;margin:0;padding:0;width:84px;font-size:9px;font-weight:700;background:#eef2ff;border-radius:4px"><li>inside marker wraps with text</li></ul><ul style="list-style-position:outside;list-style-type:disc;margin:0;padding-left:14px;width:84px;font-size:9px;font-weight:700;background:#f5f3ff;border-radius:4px"><li>outside marker wraps with text</li></ul></div>`
  },
  {
    name: "list-style-image",
    category: "Lists",
    description: "Replaces the list marker with a custom image — use URL or gradient for unique bullets.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "list-style-image: url(marker.svg)",
    mdnPath: "list-style-image",
    demo: `<div style="padding:10px"><ul style="list-style-image:url(data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%228%22%20height=%228%22%3E%3Ccircle%20cx=%224%22%20cy=%224%22%20r=%223%22%20fill=%22%236366f1%22/%3E%3C/svg%3E);padding-left:18px;margin:0;font-size:10px;font-weight:700"><li>custom marker</li><li>custom marker</li></ul></div>`
  }
];

// src/data/misc.ts
var misc = [
  {
    name: "all",
    category: "Misc",
    description: "Resets all CSS properties to their initial, inherited, or unset values — useful for component isolation.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "all: unset | revert | initial",
    mdnPath: "all",
    demo: `<div style="padding:10px"><div style="all:unset;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700;border:2px solid #4338ca">all: unset — resets styles</div></div>`
  },
  {
    name: "counter-increment",
    category: "Misc",
    description: "Increases a CSS counter value by a specified amount — used with counter-reset and content.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "counter-increment: section",
    mdnPath: "counter-increment",
    demo: `<div style="padding:10px"><div style="counter-reset:item"><div style="counter-increment:item;padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700;margin-bottom:4px"><span style="color:#c7d2fe">Item </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">1</span></div><div style="counter-increment:item;padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700"><span style="color:#c7d2fe">Item </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">2</span></div></div></div>`
  },
  {
    name: "counter-reset",
    category: "Misc",
    description: "Creates or resets a CSS counter to a specific value — use with counter-increment and content.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "counter-reset: section 0",
    mdnPath: "counter-reset",
    demo: `<div style="padding:10px"><div style="counter-reset:section 5"><div style="padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700"><span style="color:#c7d2fe">Counter starts at: </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">5</span></div></div></div>`
  },
  {
    name: "counter-set",
    category: "Misc",
    description: "Sets a CSS counter to a specific value without creating a new scope — newer alternative to counter-reset.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "counter-set: section 3",
    mdnPath: "counter-set",
    demo: `<div style="padding:10px"><div style="counter-reset:count"><div style="counter-set:count 10;padding:4px 8px;background:#6366f1;color:#fff;border-radius:3px;font-size:9px;font-weight:700"><span style="color:#c7d2fe">counter-set to: </span><span style="background:#4338ca;padding:2px 6px;border-radius:2px">10</span></div></div></div>`
  },
  {
    name: "direction",
    category: "Misc",
    description: "Sets the text direction — ltr (left-to-right) or rtl (right-to-left) — affects layout and text flow.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "direction: ltr | rtl",
    mdnPath: "direction",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:6px"><div style="direction:ltr;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700;text-align:start">← direction: ltr</div><div style="direction:rtl;background:#8b5cf6;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700;text-align:start">direction: rtl →</div></div>`
  },
  {
    name: "quotes",
    category: "Misc",
    description: "Sets the quotation marks used for embedded quotations — customisable for different languages.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: 'quotes: "\\201C" "\\201D" "\\2018" "\\2019"',
    mdnPath: "quotes",
    demo: `<div style="padding:10px"><div style="quotes:'«' '»' '‹' '›';background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#92400e"><q>Outer <q>nested</q> quote</q></div></div>`
  },
  {
    name: "text-orientation",
    category: "Misc",
    description: "Controls the orientation of characters in vertical writing modes — mixed, upright, or sideways.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-orientation: mixed | upright",
    mdnPath: "text-orientation",
    demo: `<div style="padding:10px;display:flex;gap:10px"><div style="writing-mode:vertical-rl;text-orientation:mixed;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700;height:80px">mixed 123</div><div style="writing-mode:vertical-rl;text-orientation:upright;background:#8b5cf6;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700;height:80px">upright 123</div></div>`
  },
  {
    name: "unicode-bidi",
    category: "Misc",
    description: "Controls how bidirectional text is handled — use with direction for complex multilingual layouts.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "unicode-bidi: normal | bidi-override | isolate",
    mdnPath: "unicode-bidi",
    demo: `<div style="padding:10px"><div style="unicode-bidi:bidi-override;direction:rtl;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:9px;font-weight:700">Hello World → dlroW olleH</div></div>`
  },
  {
    name: "writing-mode",
    category: "Misc",
    description: "Sets whether text flows horizontally or vertically — affects the entire layout direction.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "writing-mode: horizontal-tb | vertical-rl",
    mdnPath: "writing-mode",
    demo: `<div style="padding:10px;display:flex;gap:10px"><div style="writing-mode:horizontal-tb;background:#6366f1;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700">horizontal-tb</div><div style="writing-mode:vertical-rl;background:#8b5cf6;color:#fff;padding:8px;border-radius:5px;font-size:10px;font-weight:700;height:80px">vertical-rl</div></div>`
  }
];

// src/data/breaks.ts
var breaks = [
  {
    name: "orphans",
    category: "Breaks",
    description: "Sets the minimum number of lines that must be left at the bottom of a page when a paragraph breaks across pages.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "orphans: 2",
    mdnPath: "orphans",
    demo: `<div style="padding:10px"><div style="columns:2;column-gap:10px;width:200px;font-size:9px;line-height:1.4;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="orphans:3;margin:0;font-weight:700;color:#92400e">This paragraph needs at least 3 lines at the bottom of a column. Extra text to demonstrate.</p><p style="margin:6px 0 0;font-weight:700;color:#92400e">More content here.</p></div></div>`
  },
  {
    name: "page-break-after",
    category: "Breaks",
    description: "Forces or prevents a page break after the element — use avoid to keep content together.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "page-break-after: always | auto | avoid",
    mdnPath: "page-break-after",
    demo: `<div style="padding:10px"><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Section 1</div><div style="page-break-after:always;margin:4px 0;font-size:8px;color:#f59e0b;text-align:center">↓ page-break-after:always ↓</div><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Section 2 (new page)</div></div>`
  },
  {
    name: "page-break-before",
    category: "Breaks",
    description: "Forces or prevents a page break before the element — useful for chapter headings.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "page-break-before: always | auto | avoid",
    mdnPath: "page-break-before",
    demo: `<div style="padding:10px"><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Chapter 1</div><div style="page-break-before:always;margin:4px 0;font-size:8px;color:#f59e0b;text-align:center">↓ page-break-before:always ↓</div><div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:9px;font-weight:700;color:#92400e;text-align:center">Chapter 2 (new page)</div></div>`
  },
  {
    name: "page-break-inside",
    category: "Breaks",
    description: "Prevents page breaks inside an element — critical for tables and figures that must stay intact.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "page-break-inside: avoid | auto",
    mdnPath: "page-break-inside",
    demo: `<div style="padding:10px"><div style="page-break-inside:avoid;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">Important Table</p><table style="width:100%;font-size:8px;margin-top:4px;border-collapse:collapse"><tr><td style="border:1px solid #f59e0b;padding:2px">Row 1</td></tr><tr><td style="border:1px solid #f59e0b;padding:2px">Row 2</td></tr></table></div></div>`
  },
  {
    name: "widows",
    category: "Breaks",
    description: "Sets the minimum number of lines that must appear at the top of a new page/column when text breaks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "widows: 2",
    mdnPath: "widows",
    demo: `<div style="padding:10px"><div style="columns:2;column-gap:10px;width:200px;font-size:9px;line-height:1.4;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="widows:3;margin:0;font-weight:700;color:#92400e">This paragraph requires at least 3 lines at the top of the next column if it breaks across columns.</p></div></div>`
  }
];

// src/data/spacing-sides.ts
var spacingSides = [
  {
    name: "margin-top",
    category: "Spacing",
    description: "Sets the top margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-top: 1rem | auto",
    mdnPath: "margin-top",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-top:20px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-top: 20px</div></div>`
  },
  {
    name: "margin-right",
    category: "Spacing",
    description: "Sets the right margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-right: 1rem | auto",
    mdnPath: "margin-right",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-right:30px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-right: 30px</div></div>`
  },
  {
    name: "margin-bottom",
    category: "Spacing",
    description: "Sets the bottom margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-bottom: 1rem | auto",
    mdnPath: "margin-bottom",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-bottom:20px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-bottom: 20px</div></div>`
  },
  {
    name: "margin-left",
    category: "Spacing",
    description: "Sets the left margin of an element — part of the margin-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "margin-left: 1rem | auto",
    mdnPath: "margin-left",
    demo: `<div style="padding:10px;background:#f7fee7;border:2px dashed #84cc16;border-radius:6px"><div style="margin-left:30px;background:#84cc16;color:#fff;padding:6px;border-radius:3px;font-size:9px;font-weight:700;text-align:center">margin-left: 30px</div></div>`
  },
  {
    name: "margin-trim",
    category: "Spacing",
    description: "Trims margins of child elements at container edges — removes unwanted outer spacing.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "margin-trim: block | inline | all",
    mdnPath: "margin-trim",
    demo: `<div style="padding:10px"><div style="margin-trim:block;background:#f7fee7;border:2px solid #84cc16;border-radius:6px;padding:0 10px"><p style="margin-block:16px 0;background:#84cc16;color:#fff;padding:4px;border-radius:3px;font-size:9px;font-weight:700">First item</p><p style="margin-block:16px;background:#84cc16;color:#fff;padding:4px;border-radius:3px;font-size:9px;font-weight:700">Second item</p></div><p style="font-size:8px;color:#888;margin-top:4px">Top margin of first item is trimmed</p></div>`
  },
  {
    name: "padding-top",
    category: "Spacing",
    description: "Sets the top padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-top: 1rem",
    mdnPath: "padding-top",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-top:24px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-top: 24px</div></div>`
  },
  {
    name: "padding-right",
    category: "Spacing",
    description: "Sets the right padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-right: 1rem",
    mdnPath: "padding-right",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-right:30px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-right</div></div>`
  },
  {
    name: "padding-bottom",
    category: "Spacing",
    description: "Sets the bottom padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-bottom: 1rem",
    mdnPath: "padding-bottom",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-bottom:24px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-bottom</div></div>`
  },
  {
    name: "padding-left",
    category: "Spacing",
    description: "Sets the left padding of an element — part of the padding-* shorthand properties.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "padding-left: 1rem",
    mdnPath: "padding-left",
    demo: `<div style="padding:10px;background:#f7fee7;border:3px solid #84cc16;border-radius:6px"><div style="padding-left:30px;background:#84cc16;color:#fff;border-radius:3px;font-size:9px;font-weight:700;text-align:center">padding-left</div></div>`
  }
];

// src/data/transform-3d.ts
var transform3d = [
  {
    name: "backface-visibility",
    category: "Transform",
    description: "Controls whether the back face of a 3D-transformed element is visible when facing away.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "backface-visibility: visible | hidden",
    mdnPath: "backface-visibility",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:200px"><div style="transform-style:preserve-3d;transform:rotateY(180deg);backface-visibility:visible;width:50px;height:50px;background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">visible</div></div><div style="perspective:200px"><div style="transform-style:preserve-3d;transform:rotateY(180deg);backface-visibility:hidden;width:50px;height:50px;background:#6366f1;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">hidden</div></div></div>`
  },
  {
    name: "perspective",
    category: "Transform",
    description: "Defines the distance between the z=0 plane and the viewer — creates 3D depth for child elements.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "perspective: 600px | none",
    mdnPath: "perspective",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:100px;border:2px dashed #6366f1;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#6366f1;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">100px</div></div><div style="perspective:400px;border:2px dashed #8b5cf6;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#8b5cf6;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff">400px</div></div></div>`
  },
  {
    name: "perspective-origin",
    category: "Transform",
    description: "Sets the origin point for the perspective property — changes the 3D vanishing point.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "perspective-origin: center | left top | 50% 100%",
    mdnPath: "perspective-origin",
    demo: `<div style="padding:10px;display:flex;gap:12px;align-items:center"><div style="perspective:200px;perspective-origin:left top;border:2px dashed #6366f1;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#6366f1;border-radius:4px"></div></div><div style="perspective:200px;perspective-origin:right bottom;border:2px dashed #8b5cf6;border-radius:5px;padding:10px"><div style="transform:rotateY(45deg);width:40px;height:40px;background:#8b5cf6;border-radius:4px"></div></div></div>`
  }
];

// src/data/visual-borders.ts
var visualBorders = [
  {
    name: "border-color",
    category: "Visual",
    description: "Sets the color of all four borders — can specify 1-4 values for top/right/bottom/left.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-color: #6366f1 #ec4899 #f97316 #10b981",
    mdnPath: "border-color",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:6px solid;border-color:#6366f1 #ec4899 #f97316 #10b981;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 colors</div></div>`
  },
  {
    name: "border-style",
    category: "Visual",
    description: "Sets the line style of all four borders — solid, dashed, dotted, double, groove, ridge, inset, outset, none, hidden.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-style: solid dashed dotted double",
    mdnPath: "border-style",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:4px #6366f1;border-style:solid dashed dotted double;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 styles</div></div>`
  },
  {
    name: "border-width",
    category: "Visual",
    description: "Sets the width of all four borders — can specify 1-4 values for top/right/bottom/left.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-width: 1px 2px 3px 4px",
    mdnPath: "border-width",
    demo: `<div style="padding:10px;display:flex;gap:8px;align-items:center"><div style="width:60px;height:60px;border:solid #6366f1;border-width:2px 4px 6px 8px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#374151;background:#f9fafb">4 widths</div></div>`
  },
  {
    name: "border-top",
    category: "Visual",
    description: "Shorthand for border-top-width, border-top-style, and border-top-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-top: 2px solid #6366f1",
    mdnPath: "border-top",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-top:4px solid #6366f1;background:#eef2ff;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#4338ca">border-top</div></div>`
  },
  {
    name: "border-right",
    category: "Visual",
    description: "Shorthand for border-right-width, border-right-style, and border-right-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-right: 2px dashed #ec4899",
    mdnPath: "border-right",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-right:4px dashed #ec4899;background:#fdf2f8;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#be185d">border-right</div></div>`
  },
  {
    name: "border-bottom",
    category: "Visual",
    description: "Shorthand for border-bottom-width, border-bottom-style, and border-bottom-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-bottom: 2px dotted #f97316",
    mdnPath: "border-bottom",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-bottom:4px dotted #f97316;background:#fff7ed;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#c2410c">border-bottom</div></div>`
  },
  {
    name: "border-left",
    category: "Visual",
    description: "Shorthand for border-left-width, border-left-style, and border-left-color.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "border-left: 2px solid #10b981",
    mdnPath: "border-left",
    demo: `<div style="padding:10px"><div style="width:100px;height:50px;border-left:4px solid #10b981;background:#f0fdf4;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#15803d">border-left</div></div>`
  }
];

// src/data/typography-extra.ts
var typographyExtra = [
  {
    name: "hanging-punctuation",
    category: "Typography",
    description: "Controls whether punctuation marks hang outside the line box at the start/end of lines.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "hanging-punctuation: none | first | last | allow-end",
    mdnPath: "hanging-punctuation",
    demo: `<div style="padding:10px"><div style="width:140px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="hanging-punctuation:first last;margin:0;font-size:10px;font-weight:700;color:#92400e">"Hanging quotes appear outside the margin"</p></div></div>`
  },
  {
    name: "hyphenate-character",
    category: "Typography",
    description: "Specifies the character used for hyphenation at the end of lines.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: 'hyphenate-character: "-" | "•"',
    mdnPath: "hyphenate-character",
    demo: `<div style="padding:10px"><div style="width:80px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;hyphens:auto;hyphenate-character:'•'"><p style="margin:0;font-size:10px;font-weight:700;color:#92400e">Extraordinarily long word</p></div></div>`
  },
  {
    name: "hyphens",
    category: "Typography",
    description: "Controls how words are hyphenated when breaking across lines — manual, auto, or none.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "hyphens: none | manual | auto",
    mdnPath: "hyphens",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px"><p style="hyphens:none;margin:0;font-size:9px;font-weight:700;color:#92400e">Extraordinarily</p></div><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px"><p style="hyphens:auto;margin:0;font-size:9px;font-weight:700;color:#92400e">Extraordinarily</p></div></div>`
  },
  {
    name: "overflow-wrap",
    category: "Typography",
    description: "Controls how words break when they overflow their container — break-word allows mid-word breaks.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "overflow-wrap: normal | break-word | anywhere",
    mdnPath: "overflow-wrap",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:80px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;overflow-wrap:normal"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">Supercalifragilistic</p></div><div style="width:80px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;overflow-wrap:break-word"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">Supercalifragilistic</p></div></div>`
  },
  {
    name: "tab-size",
    category: "Typography",
    description: "Sets the width of tab characters (U+0009) — number of spaces or length value.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "tab-size: 2 | 4 | 8",
    mdnPath: "tab-size",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="background:#e0e7ff;border:2px solid #6366f1;border-radius:5px;padding:6px;tab-size:4;font-family:monospace;font-size:10px;color:#4338ca;font-weight:700">tab:4<span style="display:inline-block;width:4ch;background:#c7d2fe;height:8px;margin-left:2px"></span></div><div style="background:#f5f3ff;border:2px solid #8b5cf6;border-radius:5px;padding:6px;tab-size:8;font-family:monospace;font-size:10px;color:#7c3aed;font-weight:700">tab:8<span style="display:inline-block;width:8ch;background:#ddd6fe;height:8px;margin-left:2px"></span></div></div>`
  },
  {
    name: "text-align-last",
    category: "Typography",
    description: "Controls alignment of the last line of text — useful for justified paragraphs.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-align-last: auto | left | right | center | justify",
    mdnPath: "text-align-last",
    demo: `<div style="padding:10px"><div style="width:160px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="text-align:justify;text-align-last:center;margin:0;font-size:9px;font-weight:700;color:#92400e">This paragraph is justified with the last line centered in the block.</p></div></div>`
  },
  {
    name: "text-autospace",
    category: "Typography",
    description: "Controls automatic spacing between ideographic and non-ideographic text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "text-autospace: normal | ideograph-alpha",
    mdnPath: "text-autospace",
    demo: `<div style="padding:10px"><div style="text-autospace:ideograph-alpha;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:10px;font-weight:700;color:#92400e">中文English混排</div></div>`
  },
  {
    name: "text-indent",
    category: "Typography",
    description: "Indents the first line of a block-level element — negative values create hanging indents.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-indent: 2em | 1rem | -1em",
    mdnPath: "text-indent",
    demo: `<div style="padding:10px"><div style="width:160px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="text-indent:2em;margin:0;font-size:9px;font-weight:700;color:#92400e">This paragraph has its first line indented by 2em, like traditional paragraphs.</p></div></div>`
  },
  {
    name: "text-justify",
    category: "Typography",
    description: "Controls the justification algorithm when text-align: justify is set.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-justify: auto | inter-word | inter-character",
    mdnPath: "text-justify",
    demo: `<div style="padding:10px"><div style="width:160px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px"><p style="text-align:justify;text-justify:inter-word;margin:0;font-size:9px;font-weight:700;color:#92400e">Text is justified with spacing distributed between words only.</p></div></div>`
  },
  {
    name: "text-rendering",
    category: "Typography",
    description: "Hints to the browser about trade-offs in rendering text — speed vs legibility vs geometric precision.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-rendering: auto | optimizeSpeed | optimizeLegibility | geometricPrecision",
    mdnPath: "text-rendering",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:4px"><div style="text-rendering:optimizeLegibility;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#4338ca">optimizeLegibility — better kerning</div><div style="text-rendering:optimizeSpeed;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#7c3aed">optimizeSpeed — faster</div></div>`
  },
  {
    name: "text-spacing-trim",
    category: "Typography",
    description: "Controls spacing around punctuation characters in CJK text.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "text-spacing-trim: normal | space-all | trim-start",
    mdnPath: "text-spacing-trim",
    demo: `<div style="padding:10px"><div style="text-spacing-trim:trim-start;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:8px;font-size:12px;font-weight:700;color:#92400e">「 trimming 」</div></div>`
  },
  {
    name: "text-transform",
    category: "Typography",
    description: "Controls text case transformation — uppercase, lowercase, capitalize, or none.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "text-transform: none | uppercase | lowercase | capitalize",
    mdnPath: "text-transform",
    demo: `<div style="padding:10px;display:flex;flex-direction:column;gap:4px"><div style="text-transform:uppercase;background:#e0e7ff;border:2px solid #6366f1;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#4338ca">uppercase text</div><div style="text-transform:capitalize;background:#f5f3ff;border:2px solid #8b5cf6;border-radius:4px;padding:6px;font-size:10px;font-weight:700;color:#7c3aed">capitalize each word</div></div>`
  },
  {
    name: "word-break",
    category: "Typography",
    description: "Controls how words break at the end of lines — break-all allows breaks within words.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "word-break: normal | break-all | keep-all",
    mdnPath: "word-break",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;word-break:normal"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">SuperLongWord</p></div><div style="width:70px;background:#fef3c7;border:2px solid #f59e0b;border-radius:5px;padding:6px;word-break:break-all"><p style="margin:0;font-size:9px;font-weight:700;color:#92400e">SuperLongWord</p></div></div>`
  }
];

// src/data/tables-extra.ts
var tablesExtra = [
  {
    name: "caption-side",
    category: "Tables",
    description: "Sets the position of a table caption — top (default) or bottom of the table.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "caption-side: top | bottom",
    mdnPath: "caption-side",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:collapse;font-size:9px"><caption style="caption-side:top;font-weight:700;color:#6366f1;padding:4px">Top Caption</caption><tr><td style="border:2px solid #6366f1;padding:6px">Cell</td></tr></table><table style="border-collapse:collapse;font-size:9px"><caption style="caption-side:bottom;font-weight:700;color:#8b5cf6;padding:4px">Bottom Caption</caption><tr><td style="border:2px solid #8b5cf6;padding:6px">Cell</td></tr></table></div>`
  },
  {
    name: "empty-cells",
    category: "Tables",
    description: "Controls whether empty table cells show their borders and background — show or hide.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "empty-cells: show | hide",
    mdnPath: "empty-cells",
    demo: `<div style="padding:10px;display:flex;gap:10px"><table style="border-collapse:separate;empty-cells:show;font-size:9px;border-spacing:4px"><tr><td style="border:2px solid #6366f1;padding:6px;background:#eef2ff;font-weight:700;color:#4338ca">A</td><td style="border:2px solid #6366f1;padding:6px;background:#eef2ff"></td></tr></table><table style="border-collapse:separate;empty-cells:hide;font-size:9px;border-spacing:4px"><tr><td style="border:2px solid #8b5cf6;padding:6px;background:#f5f3ff;font-weight:700;color:#7c3aed">A</td><td style="border:2px solid #8b5cf6;padding:6px;background:#f5f3ff"></td></tr></table></div>`
  }
];

// src/data/interactivity-extra.ts
var interactivityExtra = [
  {
    name: "scroll-snap-stop",
    category: "Interactivity",
    description: "Controls whether the scroll container can pass over snap positions — always forces snapping at this point.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "wide",
    example: "scroll-snap-stop: normal | always",
    mdnPath: "scroll-snap-stop",
    demo: `<div style="padding:10px"><div style="display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;width:180px;border-radius:6px;border:2px solid #6366f1">${[1, 2, 3].map((n) => `<div style="flex:0 0 180px;height:56px;background:${n === 2 ? "#6366f1" : "#818cf8"};scroll-snap-align:start;scroll-snap-stop:${n === 2 ? "always" : "normal"};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700">${n === 2 ? "stop:always" : "stop:normal"}</div>`).join("")}</div></div>`
  },
  {
    name: "scrollbar-width",
    category: "Interactivity",
    description: "Controls the width of scrollbars — auto, thin, or none to hide.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "scrollbar-width: auto | thin | none",
    mdnPath: "scrollbar-width",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:80px;height:60px;overflow:scroll;scrollbar-width:auto;border:2px solid #6366f1;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#4338ca;line-height:2;width:150px">Auto scrollbar width with overflow content here</p></div><div style="width:80px;height:60px;overflow:scroll;scrollbar-width:thin;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#7c3aed;line-height:2;width:150px">Thin scrollbar width with overflow content here</p></div></div>`
  },
  {
    name: "scrollbar-gutter",
    category: "Interactivity",
    description: "Reserves space for scrollbars to prevent layout shift when content overflows.",
    support: { ch: 1, ff: 1, sf: 1, ed: 1 },
    interop: "ltd",
    example: "scrollbar-gutter: auto | stable | stable both-edges",
    mdnPath: "scrollbar-gutter",
    demo: `<div style="padding:10px;display:flex;gap:8px"><div style="width:100px;height:50px;overflow:auto;scrollbar-gutter:stable;border:2px solid #6366f1;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#4338ca;margin:0">stable gutter</p></div><div style="width:100px;height:50px;overflow:auto;scrollbar-gutter:auto;border:2px solid #8b5cf6;border-radius:4px;padding:6px"><p style="font-size:9px;font-weight:700;color:#7c3aed;margin:0">auto gutter</p></div></div>`
  }
];

// src/data/categories.ts
var CATEGORIES = {
  Layout: {
    id: "Layout",
    name: "Layout",
    slug: "layout",
    description: "Core CSS properties for controlling element positioning and document flow",
    icon: "ri-layout-grid-line",
    color: "#6366f1",
    intro: "Layout properties form the foundation of CSS design by controlling how elements are positioned and sized within the document. These properties determine whether elements stack vertically, sit inline with text, or break out of the normal flow entirely. Mastering layout is essential for building responsive, well-structured web pages.",
    concepts: [
      "Normal flow: The default way browsers lay out elements (block-level stack, inline flow)",
      "display property: Controls how an element generates boxes in the layout tree",
      "position property: Places elements relative to their containing block or viewport",
      "Stacking context: Determines the Z-axis order of overlapping elements",
      "Containing block: The ancestor used as reference for sizing and positioning"
    ],
    related: ["Flexbox", "Grid", "Spacing"]
  },
  Flexbox: {
    id: "Flexbox",
    name: "Flexbox",
    slug: "flexbox",
    description: "A one-dimensional layout method for arranging items in rows or columns",
    icon: "ri-layout-row-line",
    color: "#8b5cf6",
    intro: "Flexbox (Flexible Box Layout) is a CSS layout module designed for one-dimensional layouts — either as a row or a column. It excels at distributing space along a single axis and aligning items within a container. Unlike traditional block/inline layouts, flexbox gives you precise control over how items grow, shrink, and align.",
    concepts: [
      "Main axis: The primary direction items are laid out (horizontal by default)",
      "Cross axis: Perpendicular to the main axis (vertical by default)",
      "Flex container: The parent element with display: flex",
      "Flex item: Child elements that participate in flex layout",
      "Free space: Remaining space after items have their natural size"
    ],
    related: ["Grid", "Spacing", "Layout"]
  },
  Grid: {
    id: "Grid",
    name: "Grid",
    slug: "grid",
    description: "A two-dimensional layout system for creating complex web layouts",
    icon: "ri-layout-column-line",
    color: "#ec4899",
    intro: "CSS Grid Layout is a powerful two-dimensional layout system that revolutionizes how we build web interfaces. Unlike Flexbox which works along a single axis, Grid lets you define both rows and columns simultaneously, making it perfect for page-level layouts and complex component designs. It treats the layout as a whole rather than individual items.",
    concepts: [
      "Grid container: Parent element with display: grid",
      "Grid tracks: The rows and columns that define the layout structure",
      "Grid line: The dividing lines between adjacent tracks (horizontal or vertical)",
      "Grid cell: The intersection of a row and column track",
      "Grid area: A rectangular region defined by start and end grid lines"
    ],
    related: ["Flexbox", "Layout", "Spacing"]
  },
  Typography: {
    id: "Typography",
    name: "Typography",
    slug: "typography",
    description: "Properties for controlling text appearance, fonts, and readability",
    icon: "ri-font-size",
    color: "#14b8a6",
    intro: "Typography in CSS encompasses everything about how text is displayed — from font selection and sizing to line height and text decoration. Good typography is crucial for readability, accessibility, and visual hierarchy. CSS provides extensive control over every aspect of text rendering.",
    concepts: [
      "Font family: The typeface or list of typefaces to use for text",
      "Font size: The visual size of text, affecting readability and hierarchy",
      "Line height: The vertical space between lines of text",
      "Text alignment: How text is positioned horizontally within its container",
      "Web fonts: Custom fonts loaded via @font-face or font services"
    ],
    related: ["Color", "Visual", "Spacing"]
  },
  Color: {
    id: "Color",
    name: "Color",
    slug: "color",
    description: "Properties for applying colors, transparency, and opacity to elements",
    icon: "ri-palette-line",
    color: "#f59e0b",
    intro: "Color properties determine the visual appearance of elements through their foreground (text) and background colors. CSS supports multiple color formats including hex codes, RGB, HSL, and named colors. Understanding color is fundamental to creating visually appealing and accessible designs.",
    concepts: [
      "color property: Sets the foreground color of text content",
      "background-color: Sets the background color behind an element's content",
      "Color formats: hex, rgb(), rgba(), hsl(), hsla(), and named colors",
      "Opacity vs transparency: How each affects element visibility",
      "currentColor: A keyword that inherits the element's color property"
    ],
    related: ["Typography", "Visual", "CSS Variables"]
  },
  Sizing: {
    id: "Sizing",
    name: "Sizing",
    slug: "sizing",
    description: "Properties for controlling element dimensions and viewport-based sizing",
    icon: "ri-expand-width-horizontal-line",
    color: "#06b6d4",
    intro: "Sizing properties define how big or small elements appear on the page. This includes fixed sizes, responsive percentages, and viewport-relative units. Proper sizing is essential for creating layouts that work across different screen sizes and maintain consistent proportions.",
    concepts: [
      "width and height: Set the intrinsic dimensions of an element",
      "min/max-width/height: Constrain element dimensions within a range",
      "Viewport units: vw, vh, vmin, vmax relative to the browser viewport",
      "box-sizing: Controls how padding/border affect element's total dimensions",
      "Intrinsic vs extrinsic sizing: Natural content size vs specified size"
    ],
    related: ["Layout", "Spacing", "Grid"]
  },
  Visual: {
    id: "Visual",
    name: "Visual",
    slug: "visual",
    description: "Properties for styling borders, backgrounds, shadows, and visual effects",
    icon: "ri-eye-line",
    color: "#84cc16",
    intro: "Visual properties give elements their distinctive appearance through borders, backgrounds, shadows, and effects. These properties transform plain HTML elements into polished UI components. They are essential for creating depth, hierarchy, and visual interest in your designs.",
    concepts: [
      "background: Shorthand for background-color, image, position, and more",
      "border: Sets width, style, and color of an element's border",
      "box-shadow: Creates drop shadows or inner shadows around elements",
      "border-radius: Rounds the corners of an element's outer border edge",
      "opacity: Controls the transparency of an element and its children"
    ],
    related: ["Color", "Animation", "Transform"]
  },
  Animation: {
    id: "Animation",
    name: "Animation",
    slug: "animation",
    description: "Properties for creating transitions and keyframe-based animations",
    icon: "ri-movie-line",
    color: "#f43f5e",
    intro: "Animation properties bring interfaces to life through motion and transitions. CSS animations can range from simple hover effects to complex multi-step sequences. They enhance user experience by providing visual feedback, guiding attention, and making interactions feel polished.",
    concepts: [
      "transition: Animates property changes over a specified duration",
      "animation: Applies keyframe animations with timing and iteration control",
      "Keyframes: Define the start, end, and intermediate states of an animation",
      "Timing functions: Control acceleration/deceleration (ease, linear, cubic-bezier)",
      "Animation properties: duration, delay, iteration-count, direction, fill-mode"
    ],
    related: ["Transform", "Visual", "Interactivity"]
  },
  Transform: {
    id: "Transform",
    name: "Transform",
    slug: "transform",
    description: "Properties for rotating, scaling, skewing, and translating elements",
    icon: "ri-drag-move-line",
    color: "#10b981",
    intro: "Transform properties modify an element's appearance by rotating, scaling, skewing, or moving it without affecting document flow. Transforms are hardware-accelerated in most browsers, making them performant for animations. They work in both 2D and 3D space.",
    concepts: [
      "translate: Moves an element along X, Y (and Z in 3D) axes",
      "rotate: Rotates an element around a point or axis",
      "scale: Enlarges or shrinks an element proportionally",
      "skew: Slants an element along X or Y axis",
      "transform-origin: Sets the point around which transformations occur"
    ],
    related: ["Animation", "Visual", "Transform"]
  },
  Spacing: {
    id: "Spacing",
    name: "Spacing",
    slug: "spacing",
    description: "Properties for controlling margin, padding, and gap between elements",
    icon: "ri-spacing",
    color: "#f97316",
    intro: "Spacing properties manage the distance between elements and their content. Proper spacing improves readability, creates visual hierarchy, and establishes consistent rhythm throughout a design. CSS offers multiple ways to control spacing, each with specific use cases.",
    concepts: [
      "margin: Space outside an element's border (pushes other elements away)",
      "padding: Space inside an element's border (between border and content)",
      "gap: Space between flex/grid items (shorthand for row-gap and column-gap)",
      "Margin collapse: Vertical margins of adjacent elements may combine",
      "Negative margins: Can pull elements closer together than their natural position"
    ],
    related: ["Layout", "Flexbox", "Grid"]
  },
  Interactivity: {
    id: "Interactivity",
    name: "Interactivity",
    slug: "interactivity",
    description: "Properties for cursor, selection, scrolling, and user interaction states",
    icon: "ri-mouse-line",
    color: "#0ea5e9",
    intro: "Interactivity properties control how users interact with elements through the cursor, text selection, scrolling behavior, and focus states. These properties enhance usability and provide visual feedback that guides users through your interface.",
    concepts: [
      "cursor: Specifies the mouse cursor displayed when hovering over an element",
      "user-select: Controls whether text can be selected by the user",
      "overflow: Controls content that overflows an element's box",
      "scroll-behavior: Defines smooth scrolling behavior for scrollable elements",
      "pointer-events: Controls whether an element can respond to pointer events"
    ],
    related: ["Animation", "Visual", "UI Components"]
  },
  "CSS Variables": {
    id: "CSS Variables",
    name: "CSS Variables",
    slug: "css-variables",
    description: "Custom properties for creating reusable values throughout stylesheets",
    icon: "ri-code-box-line",
    color: "#a855f7",
    intro: "CSS Variables (officially called custom properties) allow you to define reusable values that can be used throughout your stylesheet. They enable dynamic theming, easier maintenance, and more powerful design systems by centralizing values that might change across your design.",
    concepts: [
      "--variable-name: Custom property syntax using double dashes prefix",
      "var(): Function to reference a custom property value",
      "Inheritance: Custom properties inherit down to child elements",
      "Fallback values: Provide alternate values when a variable isn't defined",
      "Runtime modification: Variables can be changed via JavaScript for dynamic theming"
    ],
    related: ["Color", "Sizing", "Typography"]
  },
  Queries: {
    id: "Queries",
    name: "Queries",
    slug: "queries",
    description: "Media queries, container queries, and feature detection for responsive design",
    icon: "ri-responsive-line",
    color: "#e11d48",
    intro: "Query properties enable responsive and adaptive design by applying styles based on device characteristics, viewport size, or container dimensions. They are essential for building designs that work across the vast range of devices and screen sizes.",
    concepts: [
      "Media queries: Apply styles based on viewport size, device type, or orientation",
      "@media rules: The at-rule syntax for conditional CSS",
      "Container queries: Style elements based on their parent container's size",
      "Feature queries: Apply styles based on browser support (@supports)",
      "Breakpoints: Viewport widths where layout adapts to different screen sizes"
    ],
    related: ["Layout", "Grid", "Flexbox"]
  },
  Selectors: {
    id: "Selectors",
    name: "Selectors",
    slug: "selectors",
    description: "CSS selector syntax for targeting HTML elements with precision",
    icon: "ri-checkbox-multiple-blank-line",
    color: "#7c3aed",
    intro: "Selectors are the foundation of CSS — they define which elements your styles apply to. CSS offers an incredibly powerful selector system ranging from simple element names to complex patterns that can target elements based on attributes, states, position, and more.",
    concepts: [
      "Type selectors: Target elements by their tag name (div, p, span)",
      "Class and ID selectors: Target elements with specific class or id attributes",
      "Attribute selectors: Target elements based on their attributes ([type=text])",
      "Pseudo-classes: Target elements in specific states (:hover, :first-child)",
      "Pseudo-elements: Style parts of elements (::before, ::after, ::first-line)"
    ],
    related: ["Interactivity", "UI Components", "Misc"]
  },
  "UI Components": {
    id: "UI Components",
    name: "UI Components",
    slug: "ui-components",
    description: "Properties for styling form controls and UI elements",
    icon: "ri-apps-line",
    color: "#0891b2",
    intro: "UI Component properties style the interactive elements that users interact with — forms, buttons, inputs, and other interface controls. These properties define how user interface elements appear and behave, creating the bridge between functional forms and visually appealing interfaces.",
    concepts: [
      "Form elements: input, button, select, textarea styling capabilities",
      "Focus states: Visual feedback when an element receives focus",
      "Placeholder styling: Customizing input placeholder text appearance",
      "Form validation: Styling based on valid/invalid input states",
      "Button variants: Different visual styles for different button types"
    ],
    related: ["Interactivity", "Typography", "Visual"]
  },
  Tables: {
    id: "Tables",
    name: "Tables",
    slug: "tables",
    description: "Properties specifically for styling table layouts and data",
    icon: "ri-table-line",
    color: "#65a30d",
    intro: "Table properties control the layout and appearance of tabular data. While tables use HTML structure, CSS properties determine how the data is presented — from border styles and cell padding to entire table layout algorithms that affect how columns size themselves.",
    concepts: [
      "table-layout: Controls how column widths are calculated (fixed vs auto)",
      "border-collapse: Merges or separates borders between table cells",
      "border-spacing: Sets the space between adjacent cell borders",
      "caption-side: Positions the table caption (top or bottom)",
      "empty-cells: Controls visibility of cells with no content"
    ],
    related: ["Layout", "Visual", "Typography"]
  },
  Lists: {
    id: "Lists",
    name: "Lists",
    slug: "lists",
    description: "Properties for styling ordered, unordered, and custom list markers",
    icon: "ri-list-unordered",
    color: "#d97706",
    intro: "List properties control the presentation of list items — ordered and unordered lists, their markers, and positioning. CSS provides extensive control over how list markers appear, from traditional bullets and numbers to completely custom images.",
    concepts: [
      "list-style: Shorthand for type, position, and image",
      "list-style-type: Sets the marker character (disc, circle, square, decimal, etc.)",
      "list-style-position: Places markers inside or outside the list item box",
      "list-style-image: Uses a custom image as the list marker",
      "marker pseudo-element: Styles the actual marker bullet/number"
    ],
    related: ["Typography", "Visual", "UI Components"]
  },
  Misc: {
    id: "Misc",
    name: "Misc",
    slug: "misc",
    description: "Miscellaneous properties that don't fit other categories",
    icon: "ri-more-fill",
    color: "#6b7280",
    intro: "Miscellaneous properties cover useful CSS features that don't belong in other categories. This includes properties for content generation, quotes, text direction, and other specialized behaviors that enhance your designs in specific ways.",
    concepts: [
      "content: Generates content (often used with ::before and ::after)",
      "quotes: Defines quotation marks for embedded quotations",
      "direction: Sets text direction (ltr or rtl) for internationalization",
      "unicode-bidi: Controls bidirectional text formatting",
      "visibility: Shows/hides elements while preserving their space in layout"
    ],
    related: ["Typography", "Visual", "Selectors"]
  },
  Breaks: {
    id: "Breaks",
    name: "Breaks",
    slug: "breaks",
    description: "Properties for controlling page, column, and region breaks",
    icon: "ri-page-separator-line",
    color: "#db2777",
    intro: "Break properties control how content flows across pages in paged media, columns in multi-column layouts, and regions in CSS regions. They determine where content should be split and how it should behave at those break points.",
    concepts: [
      "page-break-before/after: Controls page breaks before/after an element",
      "break-before/after: More general property for page, column, or region breaks",
      "break-inside: Prevents breaks from occurring inside an element",
      "orphans and widows: Controls minimum lines at top/bottom of pages",
      "column-break: Controls column breaks in multi-column layouts"
    ],
    related: ["Layout", "Typography", "Visual"]
  }
};
// src/data/collections.ts
var COLLECTIONS = {
  Flexbox: {
    id: "Flexbox",
    name: "Flexbox",
    slug: "flexbox",
    description: "A one-dimensional layout method for arranging items in rows or columns",
    icon: "ri-layout-row-line",
    color: "#8b5cf6",
    intro: "Flexbox (Flexible Box Layout) is a CSS layout module designed for one-dimensional layouts. It excels at distributing space along a single axis and aligning items within a container. Flexbox is perfect for navigation menus, card layouts, and centering content.",
    useCases: [
      "Navigation menus and toolbars",
      "Card grids with equal-height items",
      "Centering content both vertically and horizontally",
      "Form layouts with labels and inputs",
      "Media objects (image + text side by side)"
    ],
    concepts: [
      "Main axis: The primary direction items are laid out (horizontal by default)",
      "Cross axis: Perpendicular to the main axis (vertical by default)",
      "Flex container: The parent element with display: flex",
      "Flex item: Child elements that participate in flex layout",
      "Free space: Remaining space after items have their natural size"
    ],
    examples: [
      {
        title: "Perfect Centering",
        description: "The most common use case - centering an element both horizontally and vertically within its container.",
        code: `.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`
      },
      {
        title: "Navigation Bar",
        description: "A responsive navigation bar with logo on left and links on right.",
        code: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}`
      },
      {
        title: "Card Layout",
        description: "Equal-height cards that stretch to fill the container.",
        code: `.cards {
  display: flex;
  gap: 1rem;
}

.card {
  flex: 1;
  padding: 1.5rem;
}`
      },
      {
        title: "Responsive Wrapping",
        description: "Items that wrap to multiple lines on smaller screens.",
        code: `.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 300px;
}`
      }
    ],
    related: ["Grid", "Layout", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap', flexDirection: 'row', flexGap: 10, itemCount: 3, showCode: false }" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #c4b5fd; margin: 0; font-size: 14px; font-weight: 800;">Flexbox Playground</h4>
    <div style="display: flex; gap: 4px; align-items: center;">
      <button class="demo-control-btn demo-item-btn" data-on:click="$itemCount = Math.max(1, $itemCount - 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">−</button>
      <span style="color: #a78bfa; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;">$itemCount items</span>
      <button class="demo-control-btn demo-item-btn" data-on:click="$itemCount = Math.min(8, $itemCount + 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">+</button>
    </div>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$justifyContent = 'flex-start'" data-class:active="$justifyContent === 'flex-start'">flex-start</button>
    <button class="demo-control-btn" data-on:click="$justifyContent = 'center'" data-class:active="$justifyContent === 'center'">center</button>
    <button class="demo-control-btn" data-on:click="$justifyContent = 'space-between'" data-class:active="$justifyContent === 'space-between'">space-between</button>
    <button class="demo-control-btn" data-on:click="$justifyContent = 'space-around'" data-class:active="$justifyContent === 'space-around'">space-around</button>
    <button class="demo-control-btn" data-on:click="$alignItems = 'flex-start'" data-class:active="$alignItems === 'flex-start'" style="background: #7c3aed33">align-start</button>
    <button class="demo-control-btn" data-on:click="$alignItems = 'center'" data-class:active="$alignItems === 'center'" style="background: #7c3aed33">align-center</button>
    <button class="demo-control-btn" data-on:click="$flexWrap = 'wrap'" data-class:active="$flexWrap === 'wrap'" style="background: #9333ea33">wrap</button>
    <button class="demo-control-btn" data-on:click="$flexWrap = 'nowrap'" data-class:active="$flexWrap === 'nowrap'" style="background: #9333ea33">nowrap</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'row'" data-class:active="$flexDirection === 'row'" style="background: #a855f733">row</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'column'" data-class:active="$flexDirection === 'column'" style="background: #a855f733">column</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'row-reverse'" data-class:active="$flexDirection === 'row-reverse'" style="background: #a855f733">row-reverse</button>
    <button class="demo-control-btn" data-on:click="$flexDirection = 'column-reverse'" data-class:active="$flexDirection === 'column-reverse'" style="background: #a855f733">column-reverse</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
    <span data-text="$flexGap + 'px'" style="color: #c4b5fd; font-size: 12px; font-weight: 700;"></span>
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
    <span data-text="$flexGap + 'px'" style="color: #c4b5fd; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;"></span>
  </div>
  <div class="demo-canvas-area" style="display: flex; height: 160px; border-color: #6366f1; border-width: 2px; border-style: dashed; border-radius: 12px;" data-style:justify-content="$justifyContent" data-style:align-items="$alignItems" data-style:flex-wrap="$flexWrap" data-style:flex-direction="$flexDirection" data-style:gap="$flexGap + 'px'">
    <div class="demo-item-box" data-class:hidden="$itemCount < 1" style="background: linear-gradient(135deg, #818cf8, #6366f1); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">1</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 2" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">2</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 3" style="background: linear-gradient(135deg, #c4b5fd, #a78bfa); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">3</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 4" style="background: linear-gradient(135deg, #e9d5ff, #c4b5fd); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">4</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 5" style="background: linear-gradient(135deg, #f472b6, #e879f9); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">5</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 6" style="background: linear-gradient(135deg, #fb7185, #f43f5e); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">6</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 7" style="background: linear-gradient(135deg, #67e8f9, #06b6d4); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">7</div>
    <div class="demo-item-box" data-class:hidden="$itemCount < 8" style="background: linear-gradient(135deg, #34d399, #10b981); min-width: 60px; min-height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">8</div>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #c4b5fd; font-size: 12px; font-weight: 700;">Gap:</label>
    <input type="range" min="0" max="30" step="1" data-bind:flexGap style="width: 80px;">
    <span data-text="$flexGap + 'px'" style="color: #c4b5fd; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;"></span>
  </div>
  <div class="demo-code-panel">
    <button class="demo-toggle-btn" data-on:click="$showCode = !$showCode">Code</button>
    <div data-show="$showCode">
      <pre><code data-text="window.flexboxCSS($flexDirection, $flexGap, $justifyContent, $alignItems, $flexWrap)"></code></pre>
      <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.flexboxCSS($flexDirection, $flexGap, $justifyContent, $alignItems, $flexWrap))">Copy</button>
    </div>
  </div>
</div>`,
    learningObjectives: [
      "Understand the difference between main axis and cross axis",
      "Learn how flex container and flex items work together",
      "Master alignment properties for precise positioning",
      "Control flex item sizing with flex-grow, flex-shrink, and flex-basis"
    ],
    commonMistakes: [
      "Forgetting that flex-direction defaults to 'row', not column",
      "Using justify-content for vertical alignment (use align-items instead)",
      "Not setting flex-wrap and getting unexpected overflow",
      "Confusing flex-basis with width — flex-basis can be overridden by width"
    ],
    whenToUse: [
      "Building navigation menus that space items evenly",
      "Creating card layouts where all cards should have equal height",
      "Centering content both horizontally and vertically",
      "Creating responsive layouts that adapt to different screen sizes"
    ],
    difficulty: "intermediate",
    estimatedTime: "1.5 hours",
    prerequisites: ["Basic CSS", "Understanding of block vs inline elements"],
    strengths: [
      "Intuitive 1D alignment (horizontal or vertical)",
      "Dynamic space distribution",
      "Perfect centering with minimal code",
      "Source order independence (with order property)"
    ],
    weaknesses: [
      "Limited 2D layout capabilities",
      "Can lead to nested 'div-soup' for complex layouts",
      "Items don't align across multiple rows easily"
    ],
    annotations: [],
    antiExamples: [
      {
        badCode: `.container { display: flex; }
.item { margin-left: 50%; }`,
        goodCode: ".container { display: flex; justify-content: center; }",
        explanation: "Use alignment properties instead of manual margins for layout."
      }
    ]
  },
  Grid: {
    id: "Grid",
    name: "Grid",
    slug: "grid",
    description: "A two-dimensional layout system for creating complex web layouts",
    icon: "ri-layout-column-line",
    color: "#ec4899",
    intro: "CSS Grid Layout is a powerful two-dimensional layout system. Unlike Flexbox which works along a single axis, Grid lets you define both rows and columns simultaneously. It's perfect for page-level layouts, dashboards, and complex component designs.",
    useCases: [
      "Page layouts (header, sidebar, main content, footer)",
      "Photo galleries and image grids",
      "Dashboard layouts with multiple panels",
      "Complex form layouts",
      "Magazine-style layouts"
    ],
    concepts: [
      "Grid container: Parent element with display: grid",
      "Grid tracks: The rows and columns that define the layout structure",
      "Grid line: The dividing lines between adjacent tracks",
      "Grid cell: The intersection of a row and column track",
      "Grid area: A rectangular region defined by start and end grid lines"
    ],
    examples: [
      {
        title: "Page Layout",
        description: "Classic page structure with header, sidebar, main content, and footer.",
        code: `.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`
      },
      {
        title: "Photo Gallery",
        description: "A responsive image gallery that adapts to screen size.",
        code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}`
      },
      {
        title: "Holy Grail Layout",
        description: "The classic three-column layout with sticky footer.",
        code: `.container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
}`
      },
      {
        title: "Dashboard Grid",
        description: "Dashboard with spanning cards of different sizes.",
        code: `.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  gap: 1rem;
}

.card-wide { grid-column: span 2; }
.card-tall { grid-row: span 2; }
.card-large { grid-column: span 2; grid-row: span 2; }`
      }
    ],
    related: ["Flexbox", "Layout", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals='{"gridItemCount":2,"layoutType":"classic","gridGap":8,"showCode":false}' style="background: linear-gradient(135deg, #831843 0%, #be185d 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #f9a8d4; margin: 0; font-size: 14px; font-weight: 800;">Grid Layout Builder</h4>
    <div style="display: flex; gap: 4px; align-items: center;">
      <button class="demo-control-btn demo-item-btn" data-on:click="$gridItemCount = Math.max(2, $gridItemCount - 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">−</button>
      <span style="color: #f9a8d4; font-size: 12px; font-weight: 700; min-width: 50px; text-align: center;">$gridItemCount × $gridItemCount</span>
      <button class="demo-control-btn demo-item-btn" data-on:click="$gridItemCount = Math.min(6, $gridItemCount + 1)" style="width: 28px; height: 28px; padding: 0; font-size: 16px;">+</button>
    </div>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$layoutType = 'classic'" data-class:active="$layoutType === 'classic'">Classic</button>
    <button class="demo-control-btn" data-on:click="$layoutType = 'hero'" data-class:active="$layoutType === 'hero'">Hero Focus</button>
    <button class="demo-control-btn" data-on:click="$layoutType = 'dashboard'" data-class:active="$layoutType === 'dashboard'">Dashboard</button>
    <button class="demo-control-btn" data-on:click="$layoutType = 'gallery'" data-class:active="$layoutType === 'gallery'">Gallery</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row">
    <label style="color: #f9a8d4; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px;">Gap: <input type="range" min="0" max="24" step="2" data-bind:gridGap style="accent-color: #ec4899; width: 120px;"> <span data-text="$gridGap + 'px'"></span></label>
  </div>
  <div class="grid-demo demo-canvas-area" style="border-color: #ec4899; padding: 12px; border-radius: 12px; border-width: 2px; border-style: dashed;" data-attr:class="'grid-demo demo-canvas-area layout-class-' + $layoutType" data-style:gap="$gridGap + 'px'">
    <div class="grid-item item-header" data-class:hidden="$layoutType === 'gallery'">Header</div>
    <div class="grid-item item-sidebar" data-class:hidden="$layoutType === 'gallery' || $layoutType === 'hero'">Sidebar</div>
    <div class="grid-item item-main" data-class:hidden="$layoutType === 'gallery'">Main Content</div>
    <div class="grid-item item-footer" data-class:hidden="$layoutType === 'gallery'">Footer</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 1 || $layoutType !== 'gallery'" style="--i: 1;">1</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 2 || $layoutType !== 'gallery'" style="--i: 2;">2</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 3 || $layoutType !== 'gallery'" style="--i: 3;">3</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 4 || $layoutType !== 'gallery'" style="--i: 4;">4</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 5 || $layoutType !== 'gallery'" style="--i: 5;">5</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 6 || $layoutType !== 'gallery'" style="--i: 6;">6</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 7 || $layoutType !== 'gallery'" style="--i: 7;">7</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 8 || $layoutType !== 'gallery'" style="--i: 8;">8</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 9 || $layoutType !== 'gallery'" style="--i: 9;">9</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 10 || $layoutType !== 'gallery'" style="--i: 10;">10</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 11 || $layoutType !== 'gallery'" style="--i: 11;">11</div>
    <div class="grid-gallery-item" data-class:hidden="$gridItemCount < 12 || $layoutType !== 'gallery'" style="--i: 12;">12</div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.gridCSS($layoutType, $gridGap)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.gridCSS($layoutType, $gridGap))">Copy</button>
  </div>
  <style>
    .grid-demo { display: grid; height: 160px; border-radius: 8px; overflow: hidden; border: none; }
    .grid-demo.layout-class-classic { grid-template-columns: 200px 1fr; grid-template-rows: 50px 1fr 50px; }
    .grid-demo.layout-class-hero { grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; }
    .grid-demo.layout-class-dashboard { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
    .grid-demo.layout-class-gallery { grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); grid-auto-rows: 50px; }
    .item-header { grid-area: 1 / 1 / 2 / 3; }
    .item-sidebar { grid-area: 2 / 1 / 3 / 2; }
    .item-main { grid-area: 2 / 2 / 3 / 3; }
    .item-footer { grid-area: 3 / 1 / 4 / 3; }
    .layout-class-hero .item-sidebar { display: none; }
    .layout-class-hero .item-main { grid-area: 2 / 1 / 3 / 2; }
    .layout-class-hero .item-footer { grid-area: 3 / 1 / 4 / 2; }
    .layout-class-dashboard .item-header { grid-area: 1 / 2 / 2 / 4; }
    .layout-class-dashboard .item-sidebar { grid-area: 1 / 1 / 3 / 2; }
    .layout-class-dashboard .item-main { grid-area: 2 / 2 / 3 / 4; }
    .layout-class-dashboard .item-footer { display: none; }
    .grid-item { display: flex; align-items: center; padding: 0 16px; font-weight: 800; font-size: 12px; text-transform: uppercase; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .item-header { background: linear-gradient(135deg, #f472b6, #ec4899); color: white; border-radius: 6px; }
    .item-sidebar { background: linear-gradient(135deg, #fbcfe8, #f9a8d4); color: #831843; border-radius: 6px; }
    .item-main { background: linear-gradient(135deg, #fdf2f8, #fce7f3); color: #be185d; justify-content: center; border-radius: 6px; }
    .item-footer { background: linear-gradient(135deg, #f9a8d4, #f472b6); color: white; border-radius: 6px; }
    .grid-gallery-item { display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: white; background: linear-gradient(135deg, hsl(calc(360 / 12 * var(--i)), hsl(calc(360 / 12 * var(--i) - 30deg))); border-radius: 8px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .grid-gallery-item:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
  </style>
</div>`,
    learningObjectives: [
      "Understand the difference between explicit and implicit grids",
      "Learn to use grid-template-columns and grid-template-rows effectively",
      "Master grid-area and grid-template-areas for complex layouts",
      "Control grid placement with line-based positioning"
    ],
    commonMistakes: [
      "Forgetting to set grid-template-columns, resulting in a single column",
      "Confusing grid gap with margin — gaps only apply between grid cells",
      "Not using fr units and relying on fixed widths that don't adapt",
      "Creating rigid grids that break on smaller screens"
    ],
    whenToUse: [
      "Building complex page layouts with headers, sidebars, and footers",
      "Creating photo galleries or card grids",
      "Designing dashboard layouts with multiple panels",
      "When you need precise control over both rows and columns"
    ],
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    prerequisites: ["Basic CSS", "Understanding of the box model"],
    strengths: [
      "Full 2D control (rows and columns simultaneously)",
      "Area-based layouts are extremely readable",
      "Eliminates need for nested wrapper divs",
      "Precise alignment across multiple elements"
    ],
    weaknesses: [
      "Higher learning curve than Flexbox",
      "Overkill for simple 1D alignment",
      "Older browser support required polyfills (historically)"
    ],
    annotations: []
  },
  Typography: {
    id: "Typography",
    name: "Typography",
    slug: "typography",
    description: "Properties for controlling text appearance, fonts, and readability",
    icon: "ri-font-size",
    color: "#14b8a6",
    intro: "Typography in CSS encompasses everything about how text is displayed. Good typography is crucial for readability, accessibility, and visual hierarchy. CSS provides extensive control over font selection, sizing, spacing, and text effects.",
    useCases: [
      "Setting up a design system's type scale",
      "Creating readable body text with optimal line length",
      "Implementing custom fonts from Google Fonts or custom sources",
      "Styling headings with consistent hierarchy",
      "Text effects like shadows and decoration"
    ],
    concepts: [
      "Font family: The typeface or list of typefaces to use",
      "Font size: The visual size of text, affecting readability",
      "Line height: The vertical space between lines of text",
      "Text alignment: How text is positioned horizontally",
      "Web fonts: Custom fonts loaded via @font-face"
    ],
    examples: [
      {
        title: "Readable Body Text",
        description: "Optimal line length and line height for comfortable reading.",
        code: `.article {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 65ch;
}`
      },
      {
        title: "Type Scale",
        description: "A harmonious scale for headings using CSS custom properties.",
        code: `:root {
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;
}

h1 { font-size: var(--step-3); }
h2 { font-size: var(--step-2); }
h3 { font-size: var(--step-1); }
body { font-size: var(--step-0); }`
      },
      {
        title: "Google Fonts",
        description: "Importing and applying a custom font.",
        code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

h1, h2, h3 {
  font-weight: 700;
}`
      },
      {
        title: "Text Effects",
        description: "Text shadows and styling for visual impact.",
        code: `.title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}`
      }
    ],
    related: ["Color", "Visual", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ fontFamily: "'Georgia', serif", fontSize: '24px', lineHeight: '1.6', letterSpacing: '0px', fontWeight: '400', textAlign: 'left', showCode: false }" style="background: linear-gradient(135deg, #134e4a 0%, #0f766e 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #5eead4; margin: 0; font-size: 14px; font-weight: 800;">Type Lab</h4>
    <div style="display: flex; gap: 4px; align-items: center;">
      <button class="demo-control-btn" data-on:click="$fontFamily = 'Georgia, serif'" data-class:active="$fontFamily === 'Georgia, serif'">Serif</button>
      <button class="demo-control-btn" data-on:click="$fontFamily = 'Inter, sans-serif'" data-class:active="$fontFamily === 'Inter, sans-serif'">Sans</button>
      <button class="demo-control-btn" data-on:click="$fontFamily = 'monospace'" data-class:active="$fontFamily === 'monospace'">Mono</button>
    </div>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$fontSize = '16px'" data-class:active="$fontSize === '16px'">Small</button>
    <button class="demo-control-btn" data-on:click="$fontSize = '24px'" data-class:active="$fontSize === '24px'">Medium</button>
    <button class="demo-control-btn" data-on:click="$fontSize = '36px'" data-class:active="$fontSize === '36px'">Large</button>
    <button class="demo-control-btn" data-on:click="$lineHeight = '1.2'" data-class:active="$lineHeight === '1.2'" style="background: #14b8a633">Tight</button>
    <button class="demo-control-btn" data-on:click="$lineHeight = '1.8'" data-class:active="$lineHeight === '1.8'" style="background: #14b8a633">Loose</button>
    <button class="demo-control-btn" data-on:click="$fontWeight = '400'" data-class:active="$fontWeight === '400'" style="background: #2dd4bf33; color: #134e4a">Regular</button>
    <button class="demo-control-btn" data-on:click="$fontWeight = '700'" data-class:active="$fontWeight === '700'" style="background: #2dd4bf33; color: #134e4a">Bold</button>
    <button class="demo-control-btn" data-on:click="$textAlign = 'left'" data-class:active="$textAlign === 'left'" style="background: #5eead433">Left</button>
    <button class="demo-control-btn" data-on:click="$textAlign = 'center'" data-class:active="$textAlign === 'center'" style="background: #5eead433">Center</button>
    <button class="demo-control-btn" data-on:click="$textAlign = 'right'" data-class:active="$textAlign === 'right'" style="background: #5eead433">Right</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #5eead4; font-size: 12px; font-weight: 700;">Letter Spacing:</label>
    <input type="range" min="-2" max="10" step="0.5" data-bind:letterSpacing style="width: 80px;">
  </div>
  <div contenteditable="true" class="demo-canvas-area" style="background: rgba(255,255,255,0.95); padding: 20px; color: #134e4a; outline: none; border-color: #5eead4; border-width: 2px; border-style: dashed; border-radius: 12px; transition: all 0.3s ease;" data-style:font-size="$fontSize" data-style:line-height="$lineHeight" data-style:font-family="$fontFamily" data-style:font-weight="$fontWeight" data-style:text-align="$textAlign" data-style:letter-spacing="$letterSpacing + 'px'">
    Good typography is invisible. You only notice it when it's bad.
  </div>
  <div class="demo-code-panel">
    <button class="demo-toggle-btn" data-on:click="$showCode = !$showCode">Code</button>
    <div data-show="$showCode">
      <pre><code data-text="window.typographyCSS($fontFamily, $fontSize, $lineHeight, $letterSpacing, $fontWeight, $textAlign)"></code></pre>
      <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.typographyCSS($fontFamily, $fontSize, $lineHeight, $letterSpacing, $fontWeight, $textAlign))">Copy</button>
    </div>
  </div>
</div>`,
    learningObjectives: [
      "Understand font selection and font-weight properties",
      "Learn to create readable text with proper line-height and max-width",
      "Master text alignment and text-decoration properties",
      "Implement custom web fonts using @import or @font-face"
    ],
    commonMistakes: [
      "Setting font-size in pixels without considering accessibility",
      "Using line-height without units, causing unexpected scaling",
      "Not setting a fallback font family, leading to layout shifts",
      "Overusing text-transform for styling instead of semantic HTML"
    ],
    whenToUse: [
      "Setting up typography systems for design consistency",
      "Creating readable article layouts with optimal line lengths",
      "Implementing custom fonts for brand identity",
      "Styling headings and body text for visual hierarchy"
    ],
    difficulty: "beginner",
    estimatedTime: "1.5 hours",
    prerequisites: ["Basic HTML", "Basic CSS selectors"],
    strengths: [
      "Crucial for readability and accessibility",
      "Establishes brand identity and visual tone",
      "Responsive type scales improve UX across devices"
    ],
    weaknesses: [
      "Poor font choices can break layout consistency",
      "FOUT/FOIT (Flash of Unstyled Text) during loading"
    ],
    annotations: []
  },
  Animation: {
    id: "Animation",
    name: "Animation",
    slug: "animation",
    description: "Properties for creating transitions and keyframe-based animations",
    icon: "ri-movie-line",
    color: "#f43f5e",
    intro: "Animation properties bring interfaces to life through motion and transitions. CSS animations range from simple hover effects to complex multi-step sequences. They enhance user experience by providing visual feedback and guiding attention.",
    useCases: [
      "Button hover and focus states",
      "Page transitions and route changes",
      "Loading spinners and progress indicators",
      "Revealing content on scroll",
      "Interactive UI feedback"
    ],
    concepts: [
      "transition: Animates property changes over a specified duration",
      "animation: Applies keyframe animations with timing control",
      "Keyframes: Define the start, end, and intermediate states",
      "Timing functions: Control acceleration/deceleration",
      "Animation properties: duration, delay, iteration-count, direction"
    ],
    examples: [
      {
        title: "Button Hover",
        description: "Smooth color and transform transition on button hover.",
        code: `.btn {
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  transition: transform 0.2s, background 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  background: #4f46e5;
}`
      },
      {
        title: "Fade In Animation",
        description: "Keyframe animation to fade in an element.",
        code: `@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}`
      },
      {
        title: "Loading Spinner",
        description: "A rotating spinner for loading states.",
        code: `@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`
      },
      {
        title: "Staggered Animation",
        description: "Delay animations for a staggered reveal effect.",
        code: `.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 100ms; }
.item:nth-child(3) { animation-delay: 200ms; }
.item:nth-child(4) { animation-delay: 300ms; }

.item {
  animation: slideIn 0.3s ease-out forwards;
  opacity: 0;
}`
      }
    ],
    related: ["Transform", "Visual", "Interactivity"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ animName: 'bounce', animDuration: 0.6, animTiming: 'ease', animIterations: '1', animKey: 0, showCode: false }" style="background: linear-gradient(135deg, #881337 0%, #e11d48 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #fda4af; margin: 0; font-size: 14px; font-weight: 800;">Animation Playground</h4>
    <span style="color: #fda4af; font-size: 11px; font-weight: 600; text-transform: uppercase;">$animName</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$animName = 'bounce'; $animKey = $animKey + 1" data-class:active="$animName === 'bounce'">Bounce</button>
    <button class="demo-control-btn" data-on:click="$animName = 'pulse'; $animKey = $animKey + 1" data-class:active="$animName === 'pulse'">Pulse</button>
    <button class="demo-control-btn" data-on:click="$animName = 'shake'; $animKey = $animKey + 1" data-class:active="$animName === 'shake'">Shake</button>
    <button class="demo-control-btn" data-on:click="$animName = 'spin'; $animKey = $animKey + 1" data-class:active="$animName === 'spin'">Spin</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #fda4af; font-size: 12px; font-weight: 700;">Duration:</label>
    <input type="range" min="0.1" max="3" step="0.1" data-bind:animDuration style="width: 80px;">
    <span data-text="$animDuration + 's'" style="color: #fda4af; font-size: 12px; font-weight: 700;"></span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease'" data-class:active="$animTiming === 'ease'">Ease</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'linear'" data-class:active="$animTiming === 'linear'">Linear</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease-in'" data-class:active="$animTiming === 'ease-in'">Ease In</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease-out'" data-class:active="$animTiming === 'ease-out'">Ease Out</button>
    <button class="demo-control-btn" data-on:click="$animTiming = 'ease-in-out'" data-class:active="$animTiming === 'ease-in-out'">Ease In Out</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$animIterations = '1'" data-class:active="$animIterations === '1'">1x</button>
    <button class="demo-control-btn" data-on:click="$animIterations = '3'" data-class:active="$animIterations === '3'">3x</button>
    <button class="demo-control-btn" data-on:click="$animIterations = 'infinite'" data-class:active="$animIterations === 'infinite'">Infinite</button>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; align-items: center; height: 160px; border-color: #fb7185; border-width: 2px; border-style: dashed; border-radius: 12px;">
    <div class="demo-item-box" data-key="$animKey" data-style:animation="$animName + ' ' + $animDuration + 's ' + $animTiming + ' ' + $animIterations" style="width: 60px; height: 60px; background: linear-gradient(135deg, #fb7185, #f43f5e); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: white;">ANIMATE</div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.animationCSS($animName, $animDuration + 's', $animTiming, $animIterations)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.animationCSS($animName, $animDuration + 's', $animTiming, $animIterations))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand the difference between transitions and keyframe animations",
      "Learn to create smooth hover effects with transition",
      "Master keyframe animations with multiple steps",
      "Control animation timing with easing functions"
    ],
    commonMistakes: [
      "Not specifying animation-fill-mode, losing the final state",
      "Using transitions on properties that don't support interpolation",
      "Setting animation duration too fast or too slow",
      "Forgetting to add animation-direction for alternating animations"
    ],
    whenToUse: [
      "Adding hover effects to buttons and interactive elements",
      "Creating loading spinners and progress indicators",
      "Building page load animations and reveals",
      "Implementing subtle motion feedback for user interactions"
    ],
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    prerequisites: ["Basic CSS", "Understanding of CSS selectors"],
    strengths: [
      "Smooth state changes without JavaScript",
      "GPU-accelerated performance for transforms/opacity",
      "Enhances user feedback and perceived speed"
    ],
    weaknesses: [
      "Hard to coordinate complex multi-step sequences",
      "Can't animate all properties (e.g., display)"
    ],
    annotations: []
  },
  Color: {
    id: "Color",
    name: "Color",
    slug: "color",
    description: "Properties for applying colors, transparency, and opacity to elements",
    icon: "ri-palette-line",
    color: "#f59e0b",
    intro: "Color properties determine the visual appearance of elements through foreground and background colors. CSS supports multiple color formats including hex, RGB, HSL, and named colors. Understanding color is fundamental to creating visually appealing and accessible designs.",
    useCases: [
      "Theming and dark mode support",
      "Creating color palettes with CSS variables",
      "Adding transparency and overlays",
      "Semantic colors for states (success, error, warning)",
      "Background gradients and effects"
    ],
    concepts: [
      "color property: Sets the foreground color of text",
      "background-color: Sets the background color behind content",
      "Color formats: hex, rgb(), rgba(), hsl(), hsla()",
      "Opacity vs transparency: How each affects visibility",
      "currentColor: Inherits the element's color property"
    ],
    examples: [
      {
        title: "CSS Variables Theme",
        description: "Define a color palette using CSS custom properties.",
        code: `:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --success: #22c55e;
  --error: #ef4444;
  --background: #ffffff;
  --text: #1f2937;
}

.dark-mode {
  --background: #1f2937;
  --text: #f9fafb;
}`
      },
      {
        title: "RGBA Transparency",
        description: "Add transparency to backgrounds and overlays.",
        code: `.overlay {
  background: rgba(0, 0, 0, 0.5);
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}`
      },
      {
        title: "HSL Color",
        description: "Use HSL for easy color manipulation.",
        code: `.primary { color: hsl(239, 84%, 67%); }
.secondary { color: hsl(239, 84%, 57%); }
.complementary { color: hsl(59, 84%, 67%); }

.hover:hover { color: hsl(239, 84%, 72%); }`
      },
      {
        title: "Semantic States",
        description: "Color coding for different UI states.",
        code: `.success { color: #22c55e; background: #dcfce7; }
.warning { color: #f59e0b; background: #fef3c7; }
.error { color: #ef4444; background: #fee2e2; }
.info { color: #3b82f6; background: #dbeafe; }`
      }
    ],
    related: ["Typography", "Visual", "CSS Variables"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ themeBg: '#ffffff', themeText: '#1f2937', themeBorder: '#d1d5db', themeOpacity: 1, showCode: false }" style="background: linear-gradient(135deg, #78350f 0%, #d97706 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #fde68a; margin: 0; font-size: 14px; font-weight: 800;">Theme Builder</h4>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode" style="background: #92400e;">Reset</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <button class="demo-control-btn" data-on:click="$themeBg = '#ffffff'; $themeText = '#1f2937'; $themeBorder = '#d1d5db'; $themeOpacity = 1">Light</button>
    <button class="demo-control-btn" data-on:click="$themeBg = '#1f2937'; $themeText = '#f9fafb'; $themeBorder = '#4b5563'; $themeOpacity = 1">Dark</button>
    <button class="demo-control-btn" data-on:click="$themeBg = '#eef2ff'; $themeText = '#3730a3'; $themeBorder = '#6366f1'; $themeOpacity = 1">Brand</button>
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">Opacity:</label>
    <input type="range" min="0" max="1" step="0.05" data-bind:themeOpacity style="width: 60px;">
    <span data-text="$themeOpacity" style="color: #fef3c7; font-size: 11px; font-weight: 800;"></span>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">BG:</label>
    <input type="color" aria-label="Background color picker" data-bind:themeBg style="width: 28px; height: 24px; border: none; border-radius: 4px; cursor: pointer; padding: 0;">
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">TXT:</label>
    <input type="color" aria-label="Text color picker" data-bind:themeText style="width: 28px; height: 24px; border: none; border-radius: 4px; cursor: pointer; padding: 0;">
    <label style="color: #fef3c7; font-size: 11px; font-weight: 800;">BD:</label>
    <input type="color" aria-label="Border color picker" data-bind:themeBorder style="width: 28px; height: 24px; border: none; border-radius: 4px; cursor: pointer; padding: 0;">
  </div>
  <div class="demo-canvas-area" style="padding: 24px; border: none; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 2px dashed #fbbf24;">
    <div style="padding: 24px; border-radius: 12px; border: 3px solid; transition: all 0.3s ease; width: 100%; max-width: 300px;" data-style:background="$themeBg" data-style:color="$themeText" data-style:border-color="$themeBorder" data-style:opacity="$themeOpacity">
      <h5 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 800;">Live Preview</h5>
      <p style="margin: 0; font-size: 13px; opacity: 0.8; line-height: 1.5; font-weight: 500;">Colors define the mood and accessibility of your interface.</p>
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.colorCSS($themeBg, $themeText, $themeBorder, $themeOpacity)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.colorCSS($themeBg, $themeText, $themeBorder, $themeOpacity))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand different color formats (hex, RGB, HSL)",
      "Learn to use CSS custom properties for theming",
      "Master alpha channels for transparency effects",
      "Create accessible color combinations"
    ],
    commonMistakes: [
      "Using hardcoded colors instead of CSS variables",
      "Not considering color contrast for accessibility",
      "Confusing opacity with rgba alpha channel",
      "Using named colors that may render differently across browsers"
    ],
    whenToUse: [
      "Creating theme systems with light/dark mode support",
      "Adding semi-transparent backgrounds and overlays",
      "Setting semantic colors for UI states (success, error, warning)",
      "Building color palettes with consistent hue variations"
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic CSS"],
    strengths: [
      "Vast selection of color spaces (sRGB, P3, OKLCH)",
      "Dynamic theming with CSS variables",
      "Consistent semantic mapping for UI states"
    ],
    weaknesses: [
      "Color shifts across different screen technologies",
      "Contrast compliance requires manual verification"
    ],
    annotations: []
  },
  Layout: {
    id: "Layout",
    name: "Layout",
    slug: "layout",
    description: "Core CSS properties for controlling element positioning and document flow",
    icon: "ri-layout-grid-line",
    color: "#6366f1",
    intro: "Layout properties form the foundation of CSS design by controlling how elements are positioned and sized. These properties determine whether elements stack vertically, sit inline with text, or break out of the normal flow. Mastering layout is essential for building responsive web pages.",
    useCases: [
      "Basic page structure and stacking",
      "Element positioning (relative, absolute, fixed)",
      "Creating layered interfaces with z-index",
      "Sticky headers and sidebars",
      "Controlling element visibility"
    ],
    concepts: [
      "Normal flow: Default browser layout (block vs inline)",
      "display property: Controls how elements generate boxes",
      "position property: Places elements relative to containing block",
      "Stacking context: Determines Z-axis order of overlapping elements",
      "Containing block: The ancestor used for sizing and positioning"
    ],
    examples: [
      {
        title: "Sticky Header",
        description: "Keep a header fixed at the top while scrolling.",
        code: `.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}`
      },
      {
        title: "Modal Overlay",
        description: "Center a modal on top of page content.",
        code: `.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
}`
      },
      {
        title: "Absolute Positioning",
        description: "Position an element relative to its parent.",
        code: `.card {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
}`
      },
      {
        title: "Stacking Contexts",
        description: "Control layering with z-index.",
        code: `.layer-low { position: relative; z-index: 1; }
.layer-mid { position: relative; z-index: 10; }
.layer-high { position: relative; z-index: 100; }

.modal { position: fixed; z-index: 1000; }`
      }
    ],
    related: ["Flexbox", "Grid", "Spacing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ position: 'static', posTop: 40, posLeft: 40, showCode: false }" style="background: linear-gradient(135deg, #3730a3 0%, #6366f1 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #c7d2fe; margin: 0; font-size: 14px; font-weight: 800;">Position Lab</h4>
    <span style="color: #a5b4fc; font-size: 11px; font-weight: 600;">$position</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$position = 'static'" data-class:active="$position === 'static'">Static</button>
    <button class="demo-control-btn" data-on:click="$position = 'relative'" data-class:active="$position === 'relative'">Relative</button>
    <button class="demo-control-btn" data-on:click="$position = 'absolute'" data-class:active="$position === 'absolute'">Absolute</button>
    <button class="demo-control-btn" data-on:click="$position = 'fixed'" data-class:active="$position === 'fixed'">Fixed</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" data-show="$position !== 'static'">
    <label style="color: #a5b4fc; margin-right: var(--space-xs);">Top:</label>
    <input type="range" min="0" max="100" step="5" data-bind:posTop>
    <span style="color: #a5b4fc; margin-left: var(--space-xs);" data-text="$posTop + 'px'"></span>
  </div>
  <div class="demo-controls-row" data-show="$position !== 'static'">
    <label style="color: #a5b4fc; margin-right: var(--space-xs);">Left:</label>
    <input type="range" min="0" max="150" step="5" data-bind:posLeft>
    <span style="color: #a5b4fc; margin-left: var(--space-xs);" data-text="$posLeft + 'px'"></span>
  </div>
  <div class="demo-canvas-area" style="border-color: #818cf8; border-width: 2px; border-style: dashed; border-radius: 12px; position: relative; min-height: 160px;">
    <div style="position: absolute; top: 10px; left: 10px; color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 800; text-transform: uppercase;">Container Boundary</div>
    <div class="demo-item-box" style="position: absolute; top: 40px; left: 40px; width: 80px; height: 60px; background: linear-gradient(135deg, #818cf8, #6366f1); transition: all 0.4s var(--ease-spring-2); border-radius: 12px;" data-style:position="$position" data-style:top="$posTop + 'px'" data-style:left="$posLeft + 'px'">
      MOVE ME
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.layoutCSS($position, $posTop, $posLeft)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.layoutCSS($position, $posTop, $posLeft))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand the position property values (static, relative, absolute, fixed, sticky)",
      "Learn how containing blocks work with absolute positioning",
      "Master z-index and stacking contexts",
      "Create overlays and modal dialogs"
    ],
    commonMistakes: [
      "Not setting a positioned parent, causing absolute elements to escape",
      "Overusing z-index without understanding stacking contexts",
      "Using fixed positioning without considering mobile viewports",
      "Forgetting that absolute positioning removes from normal flow"
    ],
    whenToUse: [
      "Creating sticky headers that stay in view while scrolling",
      "Building modal dialogs and overlays",
      "Positioning badges and tooltips relative to their parent",
      "Creating multi-layered interfaces with precise z-ordering"
    ],
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    prerequisites: ["Basic CSS", "Understanding of the box model"],
    strengths: [
      "Granular control over element placement",
      "Enables layered UI (modals, dropdowns, tooltips)",
      "Sticky positioning improves navigation UX"
    ],
    weaknesses: [
      "Easy to lose elements outside the viewport",
      "Complex stacking contexts can be hard to debug"
    ],
    annotations: []
  },
  Backgrounds: {
    id: "Backgrounds",
    name: "Backgrounds",
    slug: "backgrounds",
    description: "Properties for controlling element backgrounds, colors, and images",
    icon: "ri-paint-brush-line",
    color: "#22c55e",
    intro: "Background properties control what appears behind an element's content. This includes solid colors, gradient images, and the positioning/sizing of background images. Understanding backgrounds is essential for creating visually rich interfaces, from simple colored sections to complex textured backgrounds.",
    useCases: [
      "Hero sections with full-width background images",
      "Card components with subtle colored backgrounds",
      "Creating gradient effects and overlays",
      "Parallax scrolling backgrounds",
      "Text with background color highlighting"
    ],
    concepts: [
      "background-color: Sets a solid color behind all other background layers",
      "background-image: Adds one or more images or gradients as backgrounds",
      "background-position: Controls where the background image is placed",
      "background-size: Defines the dimensions of background images",
      "background-repeat: Determines if/how background images tile"
    ],
    examples: [
      {
        title: "Gradient Background",
        description: "A smooth gradient from one color to another for visual interest.",
        code: `.hero {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  );
  color: white;
  padding: 4rem 2rem;
}`
      },
      {
        title: "Cover Background Image",
        description: "An image that covers the entire element while maintaining aspect ratio.",
        code: `.banner {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
}`
      },
      {
        title: "Multiple Backgrounds",
        description: "Stack multiple background images with different positions.",
        code: `.card {
  background-color: white;
  background-image:
    linear-gradient(to right, #f0f0f0 1px, transparent 1px),
    linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
  background-size: 20px 20px;
}`
      },
      {
        title: "Fixed Background",
        description: "A background that stays in place when scrolling.",
        code: `.landing {
  background-image: url('texture.png');
  background-attachment: fixed;
  background-size: cover;
}`
      }
    ],
    related: ["Color", "Visual", "Typography"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ bgMode: 'gradient', bgSize: 'cover', bgPosition: 'center', bgRepeat: 'no-repeat', showCode: false }" style="background: linear-gradient(135deg, #14532d 0%, #22c55e 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #86efac; margin: 0; font-size: 14px; font-weight: 800;">Backgrounds Explorer</h4>
    <span style="color: #86efac; font-size: 11px; font-weight: 600; text-transform: uppercase;">$bgMode</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgMode = 'gradient'" data-class:active="$bgMode === 'gradient'">Gradient</button>
    <button class="demo-control-btn" data-on:click="$bgMode = 'solid'" data-class:active="$bgMode === 'solid'">Solid</button>
    <button class="demo-control-btn" data-on:click="$bgMode = 'image'" data-class:active="$bgMode === 'image'">Image</button>
    <button class="demo-control-btn" data-on:click="$bgMode = 'pattern'" data-class:active="$bgMode === 'pattern'">Pattern</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgSize = 'cover'" data-class:active="$bgSize === 'cover'">Cover</button>
    <button class="demo-control-btn" data-on:click="$bgSize = 'contain'" data-class:active="$bgSize === 'contain'">Contain</button>
    <button class="demo-control-btn" data-on:click="$bgSize = 'auto'" data-class:active="$bgSize === 'auto'">Auto</button>
    <button class="demo-control-btn" data-on:click="$bgSize = '50%'" data-class:active="$bgSize === '50%'">50%</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgPosition = 'center'" data-class:active="$bgPosition === 'center'">Center</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'top'" data-class:active="$bgPosition === 'top'">Top</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'bottom'" data-class:active="$bgPosition === 'bottom'">Bottom</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'left'" data-class:active="$bgPosition === 'left'">Left</button>
    <button class="demo-control-btn" data-on:click="$bgPosition = 'right'" data-class:active="$bgPosition === 'right'">Right</button>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'no-repeat'" data-class:active="$bgRepeat === 'no-repeat'">No-repeat</button>
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'repeat'" data-class:active="$bgRepeat === 'repeat'">Repeat</button>
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'repeat-x'" data-class:active="$bgRepeat === 'repeat-x'">Repeat-X</button>
    <button class="demo-control-btn" data-on:click="$bgRepeat = 'repeat-y'" data-class:active="$bgRepeat === 'repeat-y'">Repeat-Y</button>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; align-items: center; height: 200px; border-radius: 12px; border: 2px dashed #4ade80; overflow: hidden;" data-style:background="window.bgValue($bgMode)" data-style:background-size="$bgSize" data-style:background-position="$bgPosition" data-style:background-repeat="$bgRepeat" data-on:click="$bgMode = ['gradient','solid','image','pattern'][(['gradient','solid','image','pattern'].indexOf($bgMode) + 1) % 4]">
    <div style="text-align: center; color: white; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
      <div style="font-size: 24px; margin-bottom: 8px;">Visual Impact</div>
      <div style="font-size: 12px; opacity: 0.8;">Click to cycle modes</div>
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.backgroundsCSS($bgMode, $bgSize, $bgPosition, $bgRepeat)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.backgroundsCSS($bgMode, $bgSize, $bgPosition, $bgRepeat))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand background-image with gradients and URLs",
      "Learn background-position and background-size for image control",
      "Master background-repeat and background-attachment",
      "Create complex layered backgrounds"
    ],
    commonMistakes: [
      "Forgetting that background-image doesn't include background-color",
      "Not setting background-size for responsiveUsing fixed images",
      " backgrounds that cause issues on mobile",
      "Overloading with multiple large background images"
    ],
    whenToUse: [
      "Creating hero sections with full-width background images",
      "Adding gradient overlays for text readability",
      "Building textured backgrounds with patterns",
      "Implementing parallax scrolling effects"
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic CSS"],
    strengths: [
      "Supports multiple layers of images and gradients",
      "Powerful sizing control with 'cover' and 'contain'",
      "Enable visual depth with gradients and patterns"
    ],
    weaknesses: [
      "Large background images impact page load performance",
      "Fixed attachments can cause jittery scrolling on mobile"
    ],
    annotations: []
  },
  BoxModel: {
    id: "BoxModel",
    name: "Box Model",
    slug: "box-model",
    description: "Core properties controlling element sizing, spacing, and borders",
    icon: "ri-layout-box-line",
    color: "#f97316",
    intro: "The CSS Box Model is the foundation of all layout in CSS. Every element in CSS is a rectangular box, and the box model describes how the size and spacing of that box is calculated. Understanding margin, padding, border, and how box-sizing works is critical for precise layout control.",
    useCases: [
      "Creating consistent spacing between elements",
      "Adding borders to define component edges",
      "Controlling content overflow behavior",
      "Creating spacing systems for layouts",
      "Debugging layout issues"
    ],
    concepts: [
      "Content: The actual content (text, images) inside the element",
      "Padding: Space between content and border",
      "Border: The edge around padding (or content if no padding)",
      "Margin: Space outside the border, between elements",
      "box-sizing: Controls whether width/height include padding/border"
    ],
    examples: [
      {
        title: "Box Model Visualization",
        description: "Understanding the layers of the box model.",
        code: `.box {
  margin: 20px;
  border: 5px solid #333;
  padding: 20px;
  width: 200px;
  box-sizing: content-box;
}`
      },
      {
        title: "Border Box Sizing",
        description: "Use border-box to include padding and border in width.",
        code: `*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
}`
      },
      {
        title: "Collapsing Margins",
        description: "Vertical margins between elements collapse to the larger value.",
        code: `.section {
  margin-bottom: 2rem;
}

.article {
  margin-top: 1rem;
  /* Actual space = max(2rem, 1rem) = 2rem */
}`
      },
      {
        title: "Overflow Handling",
        description: "Control what happens when content overflows its container.",
        code: `.dropdown {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
}`
      }
    ],
    related: ["Layout", "Spacing", "Sizing"],
    interactiveDemo: `<div class="demo-playground-card" data-signals='{"boxMargin":20,"boxPadding":30,"boxBorder":8,"showCode":false}' style="background: linear-gradient(135deg, #7c2d12 0%, #ea580c 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #fed7aa; margin: 0; font-size: 14px; font-weight: 800;">Box Visualizer</h4>
    <div style="display: flex; gap: 8px;">
      <button class="demo-control-btn" data-on:click="$boxMargin = 20; $boxPadding = 30; $boxBorder = 8" style="background: #92400e;">Reset</button>
      <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode" data-class:active="$showCode">⟨/⟩ Code</button>
    </div>
  </div>
  <div class="demo-controls-row" style="display: flex; flex-direction: column; gap: 12px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
    <div style="display: flex; align-items: center; gap: 12px; color: #fed7aa; font-size: 13px;">
      <label style="min-width: 70px;">Margin:</label>
      <input type="range" min="0" max="50" step="5" data-bind:value="$boxMargin" style="flex: 1; accent-color: #fbbf24;">
      <span data-text="$boxMargin + 'px'" style="min-width: 45px; text-align: right; font-weight: 800;">20px</span>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; color: #fed7aa; font-size: 13px;">
      <label style="min-width: 70px;">Padding:</label>
      <input type="range" min="0" max="40" step="5" data-bind:value="$boxPadding" style="flex: 1; accent-color: #fb923c;">
      <span data-text="$boxPadding + 'px'" style="min-width: 45px; text-align: right; font-weight: 800;">30px</span>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; color: #fed7aa; font-size: 13px;">
      <label style="min-width: 70px;">Border:</label>
      <input type="range" min="0" max="20" step="2" data-bind:value="$boxBorder" style="flex: 1; accent-color: #f97316;">
      <span data-text="$boxBorder + 'px'" style="min-width: 45px; text-align: right; font-weight: 800;">8px</span>
    </div>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; align-items: center; height: 140px; border: none; border-radius: 12px; margin-top: 12px;">
    <div style="background: rgba(252, 211, 77, 0.4); border-radius: 4px; transition: all 0.3s var(--ease-spring-2); border: 1px dashed rgba(255,255,255,0.4);" data-style:padding="$boxMargin + 'px'">
      <div style="background: rgba(251, 146, 60, 0.6); border-radius: 4px; transition: all 0.3s var(--ease-spring-2); border: 2px solid #b45309;" data-style:padding="$boxBorder + 'px'">
        <div style="background: rgba(255,255,255,0.9); padding: 20px; border-radius: 2px; color: #7c2d12; font-weight: 800; font-size: 12px; text-transform: uppercase; text-align: center; transition: all 0.3s var(--ease-spring-2);" data-style:padding="$boxPadding + 'px'">
          Content
        </div>
      </div>
    </div>
  </div>
  <div class="demo-code-panel" data-show="$showCode" style="background: #1e1e1e; border-radius: 8px; padding: 12px; margin-top: 12px;">
    <pre style="margin: 0;"><code data-text="window.boxModelCSS($boxMargin, $boxPadding, $boxBorder)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.boxModelCSS($boxMargin, $boxPadding, $boxBorder))" style="margin-top: 8px; padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">Copy</button>
    <p style="font-size:10px;opacity:0.7;margin-top:8px;margin-bottom:0;">Note: This visualizer uses nested layers to illustrate the box model concept. The CSS shown is the standard way to apply these properties.</p>
  </div>
</div>`,
    learningObjectives: [
      "Understand the four layers of the box model (content, padding, border, margin)",
      "Learn how box-sizing affects element dimensions",
      "Master margin collapsing behavior",
      "Control overflow and visibility"
    ],
    commonMistakes: [
      "Forgetting box-sizing: border-box and getting unexpected widths",
      "Confusing margin with padding — margin is outside, padding is inside",
      "Not accounting for borders in total element width",
      "Not understanding margin collapsing between adjacent elements"
    ],
    whenToUse: [
      "Creating consistent spacing systems for layouts",
      "Adding borders to define component boundaries",
      "Controlling overflow in dropdowns and scrollable areas",
      "Debugging layout issues by understanding element dimensions"
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic HTML", "Basic CSS"],
    strengths: [
      "Fundamental to all web layout and spacing",
      "Border-box makes sizing predictable",
      "Clear separation of internal and external space"
    ],
    weaknesses: [
      "Margin collapsing can be confusing for beginners",
      "Default content-box sizing often leads to overflow"
    ],
    annotations: []
  },
  Transitions: {
    id: "Transitions",
    name: "Transitions",
    slug: "transitions",
    description: "Properties for creating smooth animated transitions between property values",
    icon: "ri-loader-line",
    color: "#a855f7",
    intro: "Transitions allow you to animate changes to CSS property values over a specified duration. Instead of values changing instantly, transitions interpolate smoothly between old and new values. This creates polished, interactive user experiences with minimal code.",
    useCases: [
      "Button hover and focus state animations",
      "Menu open/close animations",
      "Modal fade in/out effects",
      "Color changes on user interaction",
      "Transform changes (scale, rotate, translate)"
    ],
    concepts: [
      "transition-property: The specific property to animate",
      "transition-duration: How long the transition takes",
      "transition-timing-function: The acceleration curve (ease, linear, etc.)",
      "transition-delay: How long to wait before starting",
      "Shorthand: All properties can be combined in one declaration"
    ],
    examples: [
      {
        title: "Simple Button Transition",
        description: "Smooth color and transform change on hover.",
        code: `.btn {
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}`
      },
      {
        title: "Delayed Transition",
        description: "Start the transition after a brief delay.",
        code: `.tooltip {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease 0.2s,
              transform 0.3s ease 0.2s;
}

.tooltip.show {
  opacity: 1;
  transform: translateY(0);
}`
      },
      {
        title: "Multiple Properties",
        description: "Animate different properties with different timings.",
        code: `.card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}`
      },
      {
        title: "Timing Functions",
        description: "Different easing curves for different effects.",
        code: `.bounce:hover { transform: scale(1.1); transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.linear:hover { transform: translateX(50px); transition-timing-function: linear; }
.smooth:hover { transform: translateX(50px); transition-timing-function: ease-in-out; }`
      }
    ],
    related: ["Animation", "Transform", "Visual"],
    interactiveDemo: `<div class="demo-playground-card" data-signals="{ timing: 'ease', duration: '0.6', transitionProp: 'all', showCode: false }" style="background: linear-gradient(135deg, #581c87 0%, #a855f7 100%);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-s);">
    <h4 style="color: #e9d5ff; margin: 0; font-size: 14px; font-weight: 800;">Micro-interaction Lab</h4>
    <span style="color: #e9d5ff; font-size: 11px; font-weight: 600; text-transform: uppercase;">$timing</span>
  </div>
  <div class="demo-controls-row">
    <button class="demo-control-btn" data-on:click="$transitionProp = 'all'" data-class:active="$transitionProp === 'all'">all</button>
    <button class="demo-control-btn" data-on:click="$transitionProp = 'transform'" data-class:active="$transitionProp === 'transform'">transform</button>
    <button class="demo-control-btn" data-on:click="$transitionProp = 'background'" data-class:active="$transitionProp === 'background'">background</button>
    <button class="demo-control-btn" data-on:click="$timing = 'ease'" data-class:active="$timing === 'ease'">Ease</button>
    <button class="demo-control-btn" data-on:click="$timing = 'ease-in'" data-class:active="$timing === 'ease-in'">Ease In</button>
    <button class="demo-control-btn" data-on:click="$timing = 'ease-out'" data-class:active="$timing === 'ease-out'">Ease Out</button>
    <button class="demo-control-btn" data-on:click="$timing = 'linear'" data-class:active="$timing === 'linear'">Linear</button>
    <button class="demo-control-btn" data-on:click="$timing = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'" data-class:active="$timing.includes('cubic')" style="background: #c084fc;">Bounce</button>
    <button class="demo-control-btn demo-code-toggle" data-on:click="$showCode = !$showCode">⟨/⟩ Code</button>
  </div>
  <div class="demo-controls-row" style="align-items: center; gap: 8px;">
    <label style="color: #e9d5ff; font-size: 12px; font-weight: 700;">Duration:</label>
    <input type="range" min="0.1" max="2.0" step="0.1" data-bind:duration style="width: 80px;">
    <span data-text="$duration + 's'" style="color: #e9d5ff; font-size: 12px; font-weight: 700; font-weight: 700;"></span>
  </div>
  <div class="demo-canvas-area" style="display: flex; justify-content: center; gap: 24px; padding: 20px; align-items: center; border-color: #c084fc; border-width: 2px; border-style: dashed; border-radius: 12px;">
    <div data-on:mouseenter="$_hover1 = true" data-on:mouseleave="$_hover1 = false" class="demo-item-box" data-style:transform="$_hover1 ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)'" data-style:background="$_hover1 ? '#9333ea' : '#c084fc'" data-style:transition="'$transitionProp + ' + $duration + 's ' + $timing'" style="padding: 12px 20px; width: auto; height: auto; cursor: pointer; font-size: 14px; border-radius: 8px;">HOVER</div>
    <div data-on:click="$_clicked = !$_clicked" class="demo-item-box" data-style:transform="$_clicked ? 'translateX(20px)' : 'translateX(0)'" data-style:background="$_clicked ? '#ec4899' : '#a855f7'" data-style:transition="'$transitionProp + ' + $duration + 's ' + $timing'" style="width: 50px; height: 50px; cursor: pointer; border-radius: 50%;"></div>
  </div>
  <div class="demo-code-panel" data-show="$showCode">
    <pre><code data-text="window.transitionsCSS($transitionProp, $duration, $timing)"></code></pre>
    <button class="demo-copy-btn" data-on:click="window.copyDemoCSS(window.transitionsCSS($transitionProp, $duration, $timing))">Copy</button>
  </div>
</div>`,
    learningObjectives: [
      "Understand the transition shorthand property",
      "Learn different timing functions (ease, linear, cubic-bezier)",
      "Master transition-delay for staggered effects",
      "Animate multiple properties with different timings"
    ],
    commonMistakes: [
      "Using 'all' for transitions, which can impact performance",
      "Setting duration too fast (under 0.1s) making changes imperceptible",
      "Not considering which properties can be animated",
      "Forgetting that transitions need a trigger (hover, focus, JS class)"
    ],
    whenToUse: [
      "Adding smooth hover effects to buttons and links",
      "Creating menu open/close animations",
      "Implementing focus states for better accessibility",
      "Building modal fade in/out transitions"
    ],
    difficulty: "beginner",
    estimatedTime: "1 hour",
    prerequisites: ["Basic CSS selectors"],
    strengths: [
      "Declarative animation of property values",
      "Minimal code for polished interactions",
      "Built-in easing functions for natural motion"
    ],
    weaknesses: [
      "Requires a trigger (hover, focus, class change)",
      "Can't animate auto dimensions easily"
    ],
    annotations: []
  }
};
var COLLECTIONS_LIST = Object.values(COLLECTIONS);

// src/data/index.ts
function toShortKeys(prop) {
  return {
    n: prop.name,
    c: prop.category,
    d: prop.description,
    s: prop.support,
    i: prop.interop,
    x: prop.example,
    m: prop.mdnPath,
    demo: prop.demo,
    v: prop.values,
    caniuse: prop.caniuse,
    default: prop.default
  };
}
var CSS_PROPERTIES = [
  ...layout.map(toShortKeys),
  ...flexbox.map(toShortKeys),
  ...grid.map(toShortKeys),
  ...typography.map(toShortKeys),
  ...color.map(toShortKeys),
  ...sizing.map(toShortKeys),
  ...visual.map(toShortKeys),
  ...animation.map(toShortKeys),
  ...transform.map(toShortKeys),
  ...spacing.map(toShortKeys),
  ...interactivity.map(toShortKeys),
  ...cssVariables.map(toShortKeys),
  ...queries.map(toShortKeys),
  ...selectors.map(toShortKeys),
  ...uiComponents.map(toShortKeys),
  ...tables.map(toShortKeys),
  ...lists.map(toShortKeys),
  ...misc.map(toShortKeys),
  ...breaks.map(toShortKeys),
  ...spacingSides.map(toShortKeys),
  ...transform3d.map(toShortKeys),
  ...visualBorders.map(toShortKeys),
  ...typographyExtra.map(toShortKeys),
  ...tablesExtra.map(toShortKeys),
  ...interactivityExtra.map(toShortKeys)
];
var CATS = [...new Set(CSS_PROPERTIES.map((p) => p.c))];
var INTEROPS = ["wide", "b2024", "b2023", "b2022", "ltd", "exp"];
// src/lib/browser-icons.ts
var BROWSER_KEYS = ["ch", "ff", "sf", "ed"];
var BROWSER_NAMES = {
  ch: "Chrome",
  ff: "Firefox",
  sf: "Safari",
  ed: "Edge"
};
var BROWSER_CLASSES = {
  ch: "chrome",
  ff: "firefox",
  sf: "safari",
  ed: "edge"
};
var SUPPORT_STATUS = {
  1: "Supported",
  0: "Not supported",
  p: "Partial"
};
var SUPPORT_CLASS = {
  1: "y",
  0: "n",
  p: "p"
};
function bIcon(val, lbl) {
  const browserClass = BROWSER_CLASSES[lbl];
  const name = BROWSER_NAMES[lbl];
  const statusClass = SUPPORT_CLASS[val] ?? "p";
  return `<div class="browser-icon ${browserClass} ${statusClass}" title="${name}"></div>`;
}
function renderBrowserSupport(s) {
  return BROWSER_KEYS.map((b) => {
    const v = s[b];
    const cls = SUPPORT_CLASS[v];
    return `<div class="detail-b"><div class="detail-b-icon ${cls}">${bIcon(v, b)}</div><div class="detail-b-name">${BROWSER_NAMES[b]}</div><div class="detail-b-status ${cls}">${SUPPORT_STATUS[v]}</div></div>`;
  }).join("");
}

// src/lib/search.ts
var import_fuzzysort = __toESM(require_fuzzysort(), 1);
var FUZZY_OPTIONS = {
  threshold: -1e4,
  limit: 1000
};
function fuzzySearchProperties(props, query) {
  if (!query || query.trim() === "") {
    return props;
  }
  const trimmedQuery = query.trim();
  const results = import_fuzzysort.default.go(trimmedQuery, props, {
    keys: ["n", "d", "c"],
    ...FUZZY_OPTIONS
  });
  return results.map((result) => result.obj);
}
function fuzzyMatch(prop, query) {
  if (!query || query.trim() === "") {
    return true;
  }
  const trimmedQuery = query.trim();
  const queryLower = trimmedQuery.toLowerCase();
  if (prop.n.toLowerCase().includes(queryLower) || prop.d.toLowerCase().includes(queryLower) || prop.c.toLowerCase().includes(queryLower)) {
    return true;
  }
  const nameResult = import_fuzzysort.default.single(trimmedQuery, prop.n);
  const descResult = import_fuzzysort.default.single(trimmedQuery, prop.d);
  const catResult = import_fuzzysort.default.single(trimmedQuery, prop.c);
  return nameResult !== null || descResult !== null || catResult !== null;
}

// src/lib/filters.ts
function filterProperties(props, query, activeCats, activeInterops, activeBrowsers = []) {
  return props.filter((p) => (!activeCats.length || activeCats.includes(p.c)) && (!activeInterops.length || activeInterops.includes(p.i)) && (!activeBrowsers.length || activeBrowsers.every((b) => p.s[b] === 1)) && fuzzyMatch(p, query));
}
function toggleInArray(arr, item) {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}
function compareBySortField(a, b, field) {
  if (field === "prop-name") {
    return a.n.localeCompare(b.n, undefined, { sensitivity: "base" });
  }
  if (field === "prop-category") {
    return a.c.localeCompare(b.c, undefined, { sensitivity: "base" });
  }
  const rankDiff = INTEROP_SORT_RANK[a.i] - INTEROP_SORT_RANK[b.i];
  if (rankDiff !== 0)
    return rankDiff;
  return IL[a.i].localeCompare(IL[b.i], undefined, { sensitivity: "base" });
}
function sortProperties(props, field, order = "asc") {
  return [...props].sort((a, b) => {
    const result = compareBySortField(a, b, field);
    return order === "asc" ? result : -result;
  });
}
function findRelatedProps(currentProp, allProps, count = 4) {
  const sameCategory = allProps.filter((p) => p.c === currentProp.c && p.n !== currentProp.n);
  const prefix = currentProp.n.split("-")[0];
  const withPrefix = sameCategory.filter((p) => p.n.startsWith(prefix));
  const withoutPrefix = sameCategory.filter((p) => !p.n.startsWith(prefix));
  const related = [...withPrefix, ...withoutPrefix].slice(0, count);
  if (related.length < count) {
    const others = allProps.filter((p) => p.c !== currentProp.c && p.n !== currentProp.n).slice(0, count - related.length);
    related.push(...others);
  }
  return related;
}

// src/render/detail.ts
function createPropertyMap(props) {
  return new Map(props.map((p) => [p.n, p]));
}
function renderDetail(selectedProp, propMap, allProps) {
  if (!selectedProp) {
    return "";
  }
  const p = propMap.get(selectedProp);
  if (!p) {
    return "";
  }
  const color2 = CC[p.c] || "#6366f1";
  const valueExplanations = p.v ? p.v.map((v) => `
  <div class="value-explanation">
    <code class="value-code">${v.value}</code>
    <span class="value-label">${v.label}</span>
    <p class="value-desc">${v.description}</p>
  </div>
`).join("") : "";
  const related = findRelatedProps(p, allProps, 4);
  const relatedHTML = related.length === 0 ? "" : `
      <div class="detail-section related-props">
        <div class="detail-lbl">Related Properties</div>
        <div class="related-grid">
          ${related.map((r) => `
            <div class="related-card" onclick="location.hash='${encodeURIComponent(r.n)}'" style="cursor:pointer;border:1px solid ${CC[r.c] || "#6366f1"};border-radius:6px;padding:10px;background:rgba(255,255,255,0.05)">
              <div style="font-size:13px;font-weight:700;color:${CC[r.c] || "#6366f1"};margin-bottom:4px">${r.n}</div>
              <div style="font-size:11px;color:#888;line-height:1.3">${r.d.slice(0, 60)}${r.d.length > 60 ? "..." : ""}</div>
            </div>
          `).join("")}
        </div>
      </div>`;
  return `
    <div class="detail-wrap">
      <button class="back-btn" onclick="location.hash=''">
        <svg class="icon" aria-hidden="true"><use href="#ri-arrow-left-line"/></svg>
        All properties
      </button>
      <div class="detail-hero">
        <div class="detail-name" style="color:${color2}">${p.n}</div>
        <div class="detail-badges">
          <span class="cat-badge" style="background:${color2}">${p.c}</span>
          <span class="availability-badge ${p.i}">${IL[p.i]}</span>
        </div>
      </div>
      <div class="detail-demo-box">
        <div class="detail-demo-stage">${p.demo}</div>
        <div class="detail-demo-label">${p.x ? p.x.split(`
`)[0] : ""}</div>
      </div>
      <div class="detail-section">
        <div class="detail-lbl">Description</div>
        <p class="detail-desc">${p.d}</p>
      </div>
      ${valueExplanations ? `
      <div class="detail-section">
        <div class="detail-lbl">Values</div>
        <div class="values-grid">${valueExplanations}</div>
      </div>
      ` : ""}
      <div class="detail-section">
        <div class="detail-lbl">Syntax</div>
        <div class="syntax-wrapper">
          <pre class="syntax-block">${p.x}<button class="copy-btn" onclick="navigator.clipboard.writeText(&#39;${p.x.replace(/'/g, "\\'")}&#39;).then(()=>{const btn=this;btn.innerHTML='<svg class=&quot;icon&quot; aria-hidden=&quot;true&quot;><use href=&quot;#ri-check-line&quot;/></svg>';setTimeout(()=>btn.innerHTML='<svg class=&quot;icon&quot; aria-hidden=&quot;true&quot;><use href=&quot;#ri-clipboard-line&quot;/></svg>',1500)})"><svg class="icon" aria-hidden="true"><use href="#ri-clipboard-line"/></svg></button></pre>
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-lbl">Browser Support</div>
        <div class="detail-browsers">${renderBrowserSupport(p.s)}</div>
      </div>
      <div class="detail-links">
        ${p.caniuse ? `<a class="caniuse-link" href="https://caniuse.com/${p.caniuse}" target="_blank" rel="noopener">Can I Use →</a>` : ""}
        <a class="mdn-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.m}" target="_blank" rel="noopener">
          View on MDN →
        </a>
      </div>
      ${relatedHTML}
    </div>
  `;
}
function showDetailView(propName, propMap, allProps) {
  const view = document.getElementById("detail-view");
  if (!view)
    return;
  const html = renderDetail(propName, propMap, allProps);
  if (html) {
    view.innerHTML = html;
    view.classList.add("open");
    view.setAttribute("data-show", "true");
  } else {
    view.innerHTML = "";
    view.classList.remove("open");
    view.setAttribute("data-show", "false");
  }
}

// src/lib/utils.ts
function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// src/render/collection.ts
function renderPropertySection(p) {
  const anchorId = p.n.replace(/\./g, "-");
  const valuesHTML = p.v ? p.v.map((v) => `
    <div class="property-value-item">
      <code class="property-value-code">${v.value}</code>
      <span class="property-value-label">${v.label}</span>
      <p class="property-value-desc">${v.description}</p>
      ${v.demo ? `<div class="property-value-demo">${v.demo}</div>` : ""}
    </div>
  `).join("") : "";
  return `
    <div class="property-section" id="${anchorId}">
      <div class="property-header">
        <h4 class="property-name">
          <a href="#${anchorId}" class="property-anchor">#</a>
          ${p.n}
        </h4>
        <a class="property-mdn-link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.m}" target="_blank" rel="noopener">MDN</a>
      </div>

      <p class="property-description">${p.d}</p>

      ${p.default ? `
      <div class="property-default">
        <span class="property-default-label">Default:</span>
        <code class="property-default-value">${p.default}</code>
      </div>
      ` : ""}

      <div class="property-demo-box">
        <div class="property-demo-stage">${p.demo}</div>
      </div>

      ${valuesHTML ? `
      <div class="property-values">
        <h5 class="property-values-title">Values</h5>
        <div class="property-values-grid">
          ${valuesHTML}
        </div>
      </div>
      ` : ""}

      <div class="property-syntax">
        <code>${p.x}</code>
      </div>
    </div>
  `;
}
function renderCollectionPageHTML(collection, allProps) {
  const collectionCategoryMap = {
    Backgrounds: ["Visual"],
    BoxModel: ["Layout", "Spacing", "Sizing", "Visual"],
    Transitions: ["Animation"]
  };
  const targetCategories = collectionCategoryMap[collection.id] || [collection.id];
  const relatedProps = allProps.filter((p) => targetCategories.includes(p.c));
  const annotationsHTML = collection.annotations ? `
    <div class="demo-annotations">
      ${collection.annotations.map((a) => `
        <div class="annotation-marker marker-${a.type}" style="left: ${a.x}%; top: ${a.y}%;">
          <div class="annotation-dot"></div>
          <div class="annotation-popover">${a.text}</div>
        </div>
      `).join("")}
    </div>
  ` : "";
  const strengthsWeaknessesHTML = collection.strengths?.length || collection.weaknesses?.length ? `
    <section class="section-strengths-weaknesses">
      ${collection.strengths?.length ? `
      <div class="strengths-box">
        <h3>Strengths</h3>
        <ul class="strengths-list">
          ${collection.strengths.map((s) => `<li><svg class="icon strength-icon"><use href="#ri-checkbox-circle-line"/></svg>${s}</li>`).join("")}
        </ul>
      </div>` : ""}
      ${collection.weaknesses?.length ? `
      <div class="weaknesses-box">
        <h3>Weaknesses</h3>
        <ul class="weaknesses-list">
          ${collection.weaknesses.map((w) => `<li><svg class="icon weakness-icon"><use href="#ri-error-warning-line"/></svg>${w}</li>`).join("")}
        </ul>
      </div>` : ""}
    </section>
  ` : "";
  const antiExamplesHTML = collection.antiExamples?.length ? `
    <section class="section-anti-examples">
      <h3>Do & Don't</h3>
      <div class="anti-examples-grid">
        ${collection.antiExamples.map((ex) => `
          <div class="anti-example-card">
            <div class="anti-example-header">
              <span class="bad-label">Don't</span>
              <span class="good-label">Do</span>
            </div>
            <div class="anti-example-content">
              <pre class="bad-code"><code>${escapeHTML(ex.badCode)}</code></pre>
              <pre class="good-code"><code>${escapeHTML(ex.goodCode)}</code></pre>
            </div>
            <p class="anti-example-explanation">${ex.explanation}</p>
          </div>
        `).join("")}
      </div>
    </section>
  ` : "";
  const introText = `<p class="intro-text">${collection.intro}</p>`;
  const gridToggleHTML = "";
  const playPauseToggleHTML = "";
  const renderSection = (content, _className) => {
    return content;
  };
  return `
    <div class="collection-page layout-${collection.slug}" 
         style="--category-color: ${collection.color}"
         data-class:show-grid-overlay="$showGridOverlay"
         data-class:global-animation-paused="$isPaused">
      
      <nav class="collection-nav">
        <div class="nav-left">
          <button class="back-btn" onclick="location.hash=''">
            <svg class="icon" aria-hidden="true"><use href="#ri-arrow-left-line"/></svg>
            Back to all
          </button>
          <div class="hero-header-info">
            <h1 class="category-title">${collection.name}</h1>
            <div class="category-badge" style="background: ${collection.color}22; color: ${collection.color}">
              <svg class="icon" aria-hidden="true"><use href="#${collection.icon}"/></svg>
              ${collection.name}
            </div>
            <p class="category-desc">${collection.description}</p>
          </div>
        </div>
        <div class="meta-controls">
          ${gridToggleHTML}
          ${playPauseToggleHTML}
        </div>
      </nav>

      <!-- Section 1: Hero Demo Only -->
      <header class="collection-hero">
        ${collection.interactiveDemo ? `
        <div class="interactive-demo-hero">
          <div class="interactive-demo-container">
            ${collection.interactiveDemo}
            ${annotationsHTML}
          </div>
        </div>
        ` : ""}
      </header>

      <hr class="section-divider">

      <!-- Section 2: Core Concepts & Practical Guide -->
      <div class="collection-content-grid">
        <section class="section-intro">
          ${introText}
          ${renderSection(strengthsWeaknessesHTML, "section-sw")}
          ${renderSection(antiExamplesHTML, "section-anti")}

          ${collection.concepts && collection.concepts.length > 0 ? renderSection(`
          <div class="key-concepts">
            <h3>Key Concepts</h3>
            <div class="concepts-pills">
              ${collection.concepts.map((c) => `<span class="concept-pill">${c}</span>`).join("")}
            </div>
          </div>
          `, "section-concepts") : ""}
        </section>

        <section class="collection-sidebar">
          ${collection.learningObjectives && collection.learningObjectives.length > 0 ? renderSection(`
          <div class="sidebar-block learning-goals">
            <h3>Learning Goals</h3>
            <ul>${collection.learningObjectives.map((o) => `<li>${o}</li>`).join("")}</ul>
          </div>
          `, "section-goals") : ""}
          ${collection.useCases && collection.useCases.length > 0 ? renderSection(`
          <div class="sidebar-block use-cases">
            <h3>Best For</h3>
            <ul>${collection.useCases.map((u) => `<li>${u}</li>`).join("")}</ul>
          </div>
          `, "section-usecases") : ""}
          ${collection.examples && collection.examples.length > 0 ? renderSection(`
          <div class="sidebar-block quick-examples">
            <h3>Quick Examples</h3>
            ${collection.examples.map((ex) => `
              <details class="example-detail">
                <summary>${ex.title}</summary>
                <p>${ex.description}</p>
                <pre><code>${escapeHTML(ex.code)}</code></pre>
              </details>
            `).join("")}
          </div>
          `, "section-examples") : ""}
        </section>
      </div>

      <hr class="section-divider">

      <!-- Section 3: Properties Reference -->
      <section class="section-properties-reference">
        <div class="collection-properties">
          <h3 class="reference-title">Properties in ${collection.name}</h3>
          <div class="properties-list">
            ${relatedProps.map((p) => renderSection(renderPropertySection(p), "section-prop")).join("")}
          </div>
        </div>

        <div class="related-props">
          <h3>Quick Reference (${relatedProps.length} properties)</h3>
          <div class="related-grid">
            ${relatedProps.map((p) => `
              <div class="related-card" onclick="location.hash='${encodeURIComponent(p.n)}'" style="cursor:pointer">
                <div class="related-prop-name">${p.n}</div>
                <div class="related-prop-desc">${p.d}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}
function showCollectionView(collectionSlug, allProps, collections) {
  const view = document.getElementById("collection-view");
  if (!view)
    return;
  if (!collectionSlug || typeof collectionSlug !== "string") {
    view.innerHTML = "";
    return;
  }
  const collection = Object.values(collections).find((c) => c.slug === collectionSlug);
  console.log("Collection lookup for slug:", collectionSlug, "Found:", !!collection);
  if (collection) {
    view.innerHTML = renderCollectionPageHTML(collection, allProps);
    if (typeof window.Datastar !== "undefined") {
      window.Datastar.connect();
    }
  } else {
    view.innerHTML = "";
  }
}

// src/render/grid.ts
function renderGrid(items, selectedProp, onCardClick) {
  const grid2 = document.getElementById("grid");
  if (!grid2)
    return;
  if (selectedProp) {
    grid2.innerHTML = "";
    return;
  }
  grid2.innerHTML = "";
  if (!items.length) {
    grid2.innerHTML = '<div class="empty">No properties match</div>';
    return;
  }
  items.forEach((p, i) => {
    const color2 = CC[p.c] || "#6366f1";
    const el = document.createElement("div");
    const delay = Math.min(i * 15, 250);
    el.style.setProperty("--ca", color2);
    el.style.setProperty("--delay", `${delay}ms`);
    el.className = "card enter-fade";
    el.innerHTML = `
      <div class="demo-stage" style="position:relative;overflow:visible">
        <div style="width:100%;height:100%;overflow:hidden">${p.demo}</div>
        <span class="cat-badge">${p.c}</span>
      </div>
      <div class="card-bottom">
        <div class="card-meta">
          <div class="card-name-wrap">
            <h2 class="card-name" data-name="${p.n}">
              <span class="name-text">${p.n}</span>
              <span class="name-text" aria-hidden="true">${p.n}</span>
            </h2>
          </div>
        </div>
        <div class="card-support">
          <div class="browser-badges">${["ch", "ff", "sf", "ed"].map((b) => bIcon(p.s[b], b)).join("")}</div>
          <span class="availability-badge ${p.i}">${IL[p.i]}</span>
        </div>
      </div>
    `;
    el.addEventListener("click", () => {
      if (onCardClick) {
        onCardClick(p);
      } else {
        const propHash = encodeURIComponent(p.n);
        location.hash = propHash;
      }
    });
    grid2.appendChild(el);
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      grid2.querySelectorAll(".card-name").forEach((nameEl) => {
        const textEl = nameEl.querySelector(".name-text");
        if (textEl && textEl.scrollWidth > nameEl.clientWidth) {
          nameEl.classList.add("overflows");
        }
      });
    });
  });
}

// src/render/table.ts
var TABLE_BATCH_SIZE = TABLE_CONFIG.BATCH_SIZE;
var listInstance = null;
var tableFullData = [];
var tableDisplayedCount = 0;
var tableInitTimeout = null;
var isLoadingMore = false;
var currentSortField = null;
var currentSortOrder = "asc";
var SORTABLE_FIELDS = new Set(["prop-name", "prop-category", "prop-support-sort"]);
function renderRowHTML(p, idx) {
  const supportIcons = bIcon(p.s.ch, "ch") + bIcon(p.s.ff, "ff") + bIcon(p.s.sf, "sf") + bIcon(p.s.ed, "ed");
  const supportSortKey = `${String(INTEROP_SORT_RANK[p.i]).padStart(2, "0")}-${IL[p.i]}`;
  return `
    <tr class="table-row" data-idx="${idx}">
      <td class="prop-name">${p.n}</td>
      <td class="prop-category">${p.c}</td>
      <td class="prop-preview">
        <div class="preview-box">
          ${p.demo}
          <div class="preview-desc">${p.d}</div>
        </div>
      </td>
      <td class="prop-support">
        <span class="prop-support-sort">${supportSortKey}</span>
        <div class="support-icons">${supportIcons}</div>
        <span class="support-label">${IL[p.i]}</span>
      </td>
    </tr>
  `;
}
function updateSortIndicators(table) {
  const headers = table.querySelectorAll("th.sort[data-sort]");
  headers.forEach((header) => {
    header.classList.remove("asc", "desc");
    const field = header.dataset.sort;
    if (field && field === currentSortField) {
      header.classList.add(currentSortOrder);
    }
  });
}
function sortFullTableData() {
  if (!currentSortField)
    return;
  tableFullData = sortProperties(tableFullData, currentSortField, currentSortOrder);
}
function applyCurrentSort(table, onRowClick) {
  if (currentSortField) {
    const currentlyVisibleCount = Math.min(tableDisplayedCount, tableFullData.length);
    sortFullTableData();
    const tbody = table.querySelector(".list");
    if (tbody) {
      const html = tableFullData.slice(0, currentlyVisibleCount).map((p, idx) => renderRowHTML(p, idx)).join("");
      tbody.innerHTML = html;
      tableDisplayedCount = currentlyVisibleCount;
      attachRowClickListeners(tbody, tableFullData, onRowClick);
      if (listInstance && typeof listInstance.reindex === "function") {
        listInstance.reindex();
      }
      updateSentinelVisibility();
    }
  }
  updateSortIndicators(table);
}
function attachSortHandlers(table) {
  const headers = table.querySelectorAll("th.sort[data-sort]");
  headers.forEach((header) => {
    const el = header;
    if (el.dataset.sortBound === "true")
      return;
    el.dataset.sortBound = "true";
    el.addEventListener("click", (evt) => {
      evt.preventDefault();
      const field = el.dataset.sort;
      if (!field || !SORTABLE_FIELDS.has(field))
        return;
      if (currentSortField === field) {
        currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      } else {
        currentSortField = field;
        currentSortOrder = "asc";
      }
      applyCurrentSort(table);
    });
  });
}
function attachRowClickListeners(tbody, data, onRowClick) {
  if (tbody._hasRowClickListener)
    return;
  tbody._hasRowClickListener = true;
  tbody.addEventListener("click", (evt) => {
    const target = evt.target;
    const row = target.closest(".table-row");
    if (!row || !row.parentElement)
      return;
    const idx = parseInt(row.dataset?.idx || "0");
    if (data[idx]) {
      if (onRowClick) {
        onRowClick(data[idx]);
      } else {
        const propName = data[idx].n;
        const propHash = encodeURIComponent(propName);
        location.hash = propHash;
      }
    }
  });
  tbody.querySelectorAll(".table-row").forEach((row) => {
    row.style.cursor = "pointer";
  });
}
function updateSentinelVisibility() {
  const sentinel = document.getElementById("table-sentinel");
  if (sentinel) {
    const shouldShow = tableDisplayedCount < tableFullData.length;
    sentinel.style.display = shouldShow ? "block" : "none";
  }
}
function initListTable(data, onRowClick) {
  const table = document.querySelector("#table-container");
  if (!table)
    return;
  tableFullData = [...data];
  tableDisplayedCount = 0;
  if (tableInitTimeout) {
    clearTimeout(tableInitTimeout);
    tableInitTimeout = null;
  }
  isLoadingMore = false;
  if (listInstance) {
    listInstance.destroy?.();
    listInstance = null;
  }
  const tbody = table.querySelector(".list");
  if (!tbody)
    return;
  if (currentSortField) {
    sortFullTableData();
  }
  const initialData = tableFullData.slice(0, TABLE_BATCH_SIZE);
  tableDisplayedCount = initialData.length;
  const html = initialData.length > 0 ? initialData.map((p, idx) => renderRowHTML(p, idx)).join("") : '<tr><td colspan="4" style="text-align:center;padding:2rem;color:#666;">No properties found</td></tr>';
  tbody.innerHTML = html;
  if (initialData.length > 0) {
    const options = {
      valueNames: ["prop-name", "prop-category", "prop-support-sort", { data: ["idx"] }],
      listClass: "list",
      sortClass: "sort-disabled"
    };
    listInstance = new window.List("table-container", options);
    attachSortHandlers(table);
    applyCurrentSort(table, onRowClick);
    const listElement = table.querySelector(".list");
    if (listElement) {
      attachRowClickListeners(listElement, tableFullData, onRowClick);
    }
  }
  updateSentinelVisibility();
  tableInitTimeout = window.setTimeout(() => {
    const sentinel = document.getElementById("table-sentinel");
    if (sentinel) {
      const rect = sentinel.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight + 400;
      if (inViewport && tableDisplayedCount < tableFullData.length) {
        loadMoreTableRows();
      }
    }
    tableInitTimeout = null;
  }, TIMEOUTS.TABLE_INIT);
}
function loadMoreTableRows() {
  if (isLoadingMore)
    return;
  isLoadingMore = true;
  if (tableDisplayedCount >= tableFullData.length) {
    isLoadingMore = false;
    return;
  }
  const tbody = document.querySelector("#table-container .list");
  if (!tbody) {
    isLoadingMore = false;
    return;
  }
  const actualRowCount = tbody.querySelectorAll(".table-row").length;
  if (actualRowCount !== tableDisplayedCount) {
    tableDisplayedCount = actualRowCount;
  }
  if (tableDisplayedCount >= tableFullData.length) {
    isLoadingMore = false;
    return;
  }
  const nextBatch = tableFullData.slice(tableDisplayedCount, tableDisplayedCount + TABLE_BATCH_SIZE);
  if (nextBatch.length === 0) {
    isLoadingMore = false;
    return;
  }
  let startIdx = tableDisplayedCount;
  tableDisplayedCount += nextBatch.length;
  nextBatch.forEach((p) => {
    const rowHTML = renderRowHTML(p, startIdx++);
    tbody.insertAdjacentHTML("beforeend", rowHTML);
  });
  if (listInstance && typeof listInstance.reindex === "function") {
    listInstance.reindex();
    const table = document.querySelector("#table-container");
    if (table) {
      applyCurrentSort(table);
    }
  }
  attachRowClickListeners(tbody, tableFullData);
  updateSentinelVisibility();
  setTimeout(() => {
    isLoadingMore = false;
  }, TIMEOUTS.LOAD_UNLOCK);
}
function getTableDisplayedCount() {
  return tableDisplayedCount;
}
function getTableTotalCount() {
  return tableFullData.length;
}

// src/main.ts
var propMap = createPropertyMap(CSS_PROPERTIES);
function handleHashChange() {
  const hash = location.hash.slice(1);
  window.dispatchEvent(new CustomEvent("app:hashchange", { detail: { hash } }));
}
if (typeof window !== "undefined") {
  window.addEventListener("hashchange", handleHashChange);
  window.addEventListener("load", () => {
    if (location.hash) {
      handleHashChange();
    }
  });
}
function closeAllPopovers() {
  window.dispatchEvent(new CustomEvent("close-all-popovers"));
}
if (typeof window !== "undefined") {
  window.closeAllPopovers = closeAllPopovers;
  window.copyDemoCSS = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
  };
}
window.CSS_PROPERTIES = CSS_PROPERTIES;
window.P = CSS_PROPERTIES;
window.CATS = CATS;
window.INTEROPS = INTEROPS;
window.CC = CC;
window.IL = IL;
window.IC = IC;
window.bIcon = bIcon;
window.CATEGORIES = CATEGORIES;
window.COLLECTIONS = COLLECTIONS;
window.COLLECTIONS_LIST = COLLECTIONS_LIST;
window.filtered = function(q, activeCats, activeInterops, activeBrowsers = []) {
  return filterProperties(CSS_PROPERTIES, q, activeCats, activeInterops, activeBrowsers);
};
window.fuzzySearch = function(query) {
  return fuzzySearchProperties(CSS_PROPERTIES, query);
};
window.toggleInArray = toggleInArray;
window.renderBrowserSupport = renderBrowserSupport;
window.getProp = function(name) {
  return propMap.get(name);
};
window.renderDetail = function(selectedProp) {
  showDetailView(selectedProp, propMap, CSS_PROPERTIES);
};
window.renderCollectionPage = function(collectionSlug) {
  console.log("Rendering collection:", collectionSlug);
  showCollectionView(collectionSlug, CSS_PROPERTIES, COLLECTIONS);
};
window.getCategoryProps = function(categoryId) {
  return CSS_PROPERTIES.filter((p) => p.c === categoryId);
};
window.renderGrid = function(items, selectedProp) {
  renderGrid(items, selectedProp, (p) => {
    const propHash = encodeURIComponent(p.n);
    location.hash = propHash;
    setTimeout(() => {
      showDetailView(p.n, propMap, CSS_PROPERTIES);
    }, 100);
  });
};
window.initListTable = function(data) {
  initListTable(data, (p) => {
    const propHash = encodeURIComponent(p.n);
    location.hash = propHash;
    setTimeout(() => {
      showDetailView(p.n, propMap, CSS_PROPERTIES);
    }, 100);
  });
};
window.tableRowCount = getTableDisplayedCount;
window.tableTotalCount = getTableTotalCount;
window.loadMoreTableRows = loadMoreTableRows;
window.findRelatedProps = function(currentProp, count = 4) {
  return findRelatedProps(currentProp, CSS_PROPERTIES, count);
};
window.flexboxCSS = (direction, gap, justify, align, wrap) => `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;
window.typographyCSS = (family, size, lh, ls, weight, align) => `.element {
  font-family: ${family};
  font-size: ${size};
  line-height: ${lh};
  letter-spacing: ${ls};
  font-weight: ${weight};
  text-align: ${align};
}`;
window.transitionsCSS = (prop, dur, timing) => `.element {
  transition: ${prop} ${dur}s ${timing};
}

.element:hover {
  transform: scale(1.15) rotate(8deg);
}`;
window.colorCSS = (bg, text, border, opacity) => `.card {
  background-color: ${bg};
  color: ${text};
  border-color: ${border};
  opacity: ${opacity};
}`;
window.gridCSS = (layout2, gap) => {
  const presets = {
    classic: `  grid-template-columns: 200px 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";`,
    hero: `  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";`,
    dashboard: `  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar main main";`,
    gallery: `  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: repeat(2, 150px);
  grid-template-areas:
    "item1 item2"
    "item3 item4";`
  };
  return `.container {
  display: grid;
${presets[layout2] || presets.classic}
  gap: ${gap}px;
}`;
};
window.layoutCSS = (pos, top, left) => {
  if (pos === "static") {
    return `.element {
  position: static;
}`;
  }
  return `.element {
  position: ${pos};
  top: ${top}px;
  left: ${left}px;
}`;
};
window.boxModelCSS = (margin, padding, border) => `.element {
  margin: ${margin}px;
  padding: ${padding}px;
  border: ${border}px solid #333;
  box-sizing: border-box;
}`;
window.animationCSS = (name, duration, timing, iterations) => `@keyframes ${name} { /* ... */ }

.element {
  animation-name: ${name};
  animation-duration: ${duration};
  animation-timing-function: ${timing};
  animation-iteration-count: ${iterations};
}`;
window.backgroundsCSS = (mode, size, position, repeat) => `.element {
  background: ${window.bgValue(mode)};
  background-size: ${size};
  background-position: ${position};
  background-repeat: ${repeat};
}`;
window.bgValue = (mode) => {
  const map = {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    solid: "#1e3a5f",
    image: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(/images/demo-bg.webp)",
    pattern: "repeating-linear-gradient(45deg, #22c55e 0px, #22c55e 10px, #16a34a 10px, #16a34a 20px)"
  };
  return map[mode] ?? map.gradient;
};
if (typeof window !== "undefined") {
  let lastMouseMove = 0;
  const MOUSE_MOVE_THROTTLE = 50;
  let cachedRect = { left: 0, top: 0, width: 0, height: 0 };
  const throttledMouseMove = (e) => {
    const now = Date.now();
    if (now - lastMouseMove < MOUSE_MOVE_THROTTLE)
      return;
    lastMouseMove = now;
    const target = e.target;
    const parent = target.closest(".layout-interactivity, .layout-layout");
    if (!parent)
      return;
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0)
      return;
    if (rect.width === cachedRect.width && rect.height === cachedRect.height) {
      const x = (e.clientX - cachedRect.left) / cachedRect.width * 100;
      const y = (e.clientY - cachedRect.top) / cachedRect.height * 100;
      parent.style.setProperty("--mouse-x", x + "%");
      parent.style.setProperty("--mouse-y", y + "%");
    } else {
      cachedRect = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      parent.style.setProperty("--mouse-x", x + "%");
      parent.style.setProperty("--mouse-y", y + "%");
    }
  };
  document.addEventListener("mousemove", throttledMouseMove, { passive: true });
}
if (typeof window !== "undefined" && location.hash && location.hash !== "#") {
  setTimeout(handleHashChange, 50);
}

//# debugId=1FDFEB7292A75AFB64756E2164756E21
//# sourceMappingURL=bundle.js.map
