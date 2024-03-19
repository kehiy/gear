(function() {var type_impls = {
"pallet_gear_messenger":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"impl\"><a href=\"#impl-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt; CountedStorageMap&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt;<div class=\"where\">where\n    Prefix: CountedStorageMapInstance,\n    Hasher: StorageHasher,\n    Key: FullCodec,\n    Value: FullCodec,\n    QueryKind: QueryKindTrait&lt;Value, OnEmpty&gt;,\n    OnEmpty: Get&lt;&lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query&gt; + 'static,\n    MaxValues: Get&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>&gt;&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.counter_storage_final_key\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">counter_storage_final_key</a>() -&gt; [<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.array.html\">32</a>]</h4></section></summary><div class=\"docblock\"><p>The key used to store the counter of the map.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.map_storage_final_prefix\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">map_storage_final_prefix</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"Vec&lt;u8&gt;\">ⓘ</a></h4></section></summary><div class=\"docblock\"><p>The prefix used to generate the key of the map.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.hashed_key_for\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">hashed_key_for</a>&lt;KeyArg&gt;(key: KeyArg) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"Vec&lt;u8&gt;\">ⓘ</a><div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Get the storage key used to fetch a value corresponding to a specific key.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.contains_key\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">contains_key</a>&lt;KeyArg&gt;(key: KeyArg) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.bool.html\">bool</a><div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Does the value (explicitly) exist in storage?</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">get</a>&lt;KeyArg&gt;(\n    key: KeyArg\n) -&gt; &lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Load the value associated with the given key from the map.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_get\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">try_get</a>&lt;KeyArg&gt;(key: KeyArg) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Value, <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Try to get the value for the given key from the map.</p>\n<p>Returns <code>Ok</code> if it exists, <code>Err</code> if not.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.set\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">set</a>&lt;KeyArg&gt;(\n    key: KeyArg,\n    q: &lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query\n)<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Store or remove the value to be associated with <code>key</code> so that <code>get</code> returns the <code>query</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.swap\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">swap</a>&lt;KeyArg1, KeyArg2&gt;(key1: KeyArg1, key2: KeyArg2)<div class=\"where\">where\n    KeyArg1: EncodeLike&lt;Key&gt;,\n    KeyArg2: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Swap the values of two keys.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.insert\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">insert</a>&lt;KeyArg, ValArg&gt;(key: KeyArg, val: ValArg)<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,\n    ValArg: EncodeLike&lt;Value&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Store a value to be associated with the given key from the map.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.remove\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">remove</a>&lt;KeyArg&gt;(key: KeyArg)<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Remove the value under a key.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.mutate\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">mutate</a>&lt;KeyArg, R, F&gt;(key: KeyArg, f: F) -&gt; R<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut &lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query) -&gt; R,</div></h4></section></summary><div class=\"docblock\"><p>Mutate the value under a key.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_mutate\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">try_mutate</a>&lt;KeyArg, R, E, F&gt;(key: KeyArg, f: F) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;R, E&gt;<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut &lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;R, E&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Mutate the item, only if an <code>Ok</code> value is returned.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.mutate_exists\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">mutate_exists</a>&lt;KeyArg, R, F&gt;(key: KeyArg, f: F) -&gt; R<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Value&gt;) -&gt; R,</div></h4></section></summary><div class=\"docblock\"><p>Mutate the value under a key. Deletes the item if mutated to a <code>None</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_mutate_exists\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">try_mutate_exists</a>&lt;KeyArg, R, E, F&gt;(key: KeyArg, f: F) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;R, E&gt;<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Value&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;R, E&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Mutate the item, only if an <code>Ok</code> value is returned. Deletes the item if mutated to a <code>None</code>.\n<code>f</code> will always be called with an option representing if the storage item exists (<code>Some&lt;V&gt;</code>)\nor if the storage item does not exist (<code>None</code>), independent of the <code>QueryType</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.take\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">take</a>&lt;KeyArg&gt;(\n    key: KeyArg\n) -&gt; &lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Take the value under a key.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">append</a>&lt;Item, EncodeLikeItem, EncodeLikeKey&gt;(\n    key: EncodeLikeKey,\n    item: EncodeLikeItem\n)<div class=\"where\">where\n    EncodeLikeKey: EncodeLike&lt;Key&gt;,\n    Item: Encode,\n    EncodeLikeItem: EncodeLike&lt;Item&gt;,\n    Value: StorageAppend&lt;Item&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Append the given items to the value in the storage.</p>\n<p><code>Value</code> is required to implement <code>codec::EncodeAppend</code>.</p>\n<h5 id=\"warning\"><a class=\"doc-anchor\" href=\"#warning\">§</a>Warning</h5>\n<p>If the storage item is not encoded properly, the storage will be overwritten and set to\n<code>[item]</code>. Any default value set for the storage item will be ignored on overwrite.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.decode_len\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">decode_len</a>&lt;KeyArg&gt;(key: KeyArg) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>&gt;<div class=\"where\">where\n    KeyArg: EncodeLike&lt;Key&gt;,\n    Value: StorageDecodeLength,</div></h4></section></summary><div class=\"docblock\"><p>Read the length of the storage value without decoding the entire value under the given\n<code>key</code>.</p>\n<p><code>Value</code> is required to implement [<code>StorageDecodeLength</code>].</p>\n<p>If the value does not exists or it fails to decode the length, <code>None</code> is returned. Otherwise\n<code>Some(len)</code> is returned.</p>\n<h5 id=\"warning-1\"><a class=\"doc-anchor\" href=\"#warning-1\">§</a>Warning</h5>\n<p><code>None</code> does not mean that <code>get()</code> does not return a value. The default value is completly\nignored by this function.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.migrate_key\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">migrate_key</a>&lt;OldHasher, KeyArg&gt;(key: KeyArg) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Value&gt;<div class=\"where\">where\n    OldHasher: StorageHasher,\n    KeyArg: EncodeLike&lt;Key&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Migrate an item with the given <code>key</code> from a defunct <code>OldHasher</code> to the current hasher.</p>\n<p>If the key doesn’t exist, then it’s a no-op. If it does, then it returns its value.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.remove_all\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">remove_all</a>()</h4></section><span class=\"item-info\"><div class=\"stab deprecated\"><span class=\"emoji\">👎</span><span>Deprecated: Use <code>clear</code> instead</span></div></span></summary><div class=\"docblock\"><p>Remove all values in the map.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clear\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">clear</a>(limit: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>, maybe_cursor: <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&amp;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>]&gt;) -&gt; MultiRemovalResults</h4></section></summary><div class=\"docblock\"><p>Attempt to remove all items from the map.</p>\n<p>Returns <a href=\"sp_io::MultiRemovalResults\"><code>MultiRemovalResults</code></a> to inform about the result. Once\nthe resultant <code>maybe_cursor</code> field is <code>None</code>, then no further items remain to be deleted.</p>\n<p>NOTE: After the initial call for any given map, it is important that no further items\nare inserted into the map. If so, then the map may not be empty when the resultant\n<code>maybe_cursor</code> is <code>None</code>.</p>\n<h5 id=\"limit\"><a class=\"doc-anchor\" href=\"#limit\">§</a>Limit</h5>\n<p>A <code>limit</code> must always be provided through in order to cap the maximum\namount of deletions done in a single call. This is one fewer than the\nmaximum number of backend iterations which may be done by this operation and as such\nrepresents the maximum number of backend deletions which may happen. A <code>limit</code> of zero\nimplies that no keys will be deleted, though there may be a single iteration done.</p>\n<h5 id=\"cursor\"><a class=\"doc-anchor\" href=\"#cursor\">§</a>Cursor</h5>\n<p>A <em>cursor</em> may be passed in to this operation with <code>maybe_cursor</code>. <code>None</code> should only be\npassed once (in the initial call) for any given storage map. Subsequent calls\noperating on the same map should always pass <code>Some</code>, and this should be equal to the\nprevious call result’s <code>maybe_cursor</code> field.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.iter_values\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">iter_values</a>() -&gt; PrefixIterator&lt;Value, OnRemovalCounterUpdate&lt;Prefix&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Iter over all value of the storage.</p>\n<p>NOTE: If a value failed to decode because storage is corrupted then it is skipped.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.translate_values\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">translate_values</a>&lt;OldValue, F&gt;(f: F)<div class=\"where\">where\n    OldValue: Decode,\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnMut.html\" title=\"trait core::ops::function::FnMut\">FnMut</a>(OldValue) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Value&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Translate the values of all elements by a function <code>f</code>, in the map in no particular order.</p>\n<p>By returning <code>None</code> from <code>f</code> for an element, you’ll remove it from the map.</p>\n<p>NOTE: If a value fail to decode because storage is corrupted then it is skipped.</p>\n<h5 id=\"warning-2\"><a class=\"doc-anchor\" href=\"#warning-2\">§</a>Warning</h5>\n<p>This function must be used with care, before being updated the storage still contains the\nold type, thus other calls (such as <code>get</code>) will fail at decoding it.</p>\n<h5 id=\"usage\"><a class=\"doc-anchor\" href=\"#usage\">§</a>Usage</h5>\n<p>This would typically be called inside the module implementation of on_runtime_upgrade.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.try_append\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">try_append</a>&lt;KArg, Item, EncodeLikeItem&gt;(\n    key: KArg,\n    item: EncodeLikeItem\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.unit.html\">()</a>&gt;<div class=\"where\">where\n    KArg: EncodeLike&lt;Key&gt;,\n    Item: Encode,\n    EncodeLikeItem: EncodeLike&lt;Item&gt;,\n    Value: StorageTryAppend&lt;Item&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Try and append the given item to the value in the storage.</p>\n<p>Is only available if <code>Value</code> of the storage implements [<code>StorageTryAppend</code>].</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.initialize_counter\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">initialize_counter</a>() -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a></h4></section></summary><div class=\"docblock\"><p>Initialize the counter with the actual number of items in the map.</p>\n<p>This function iterates through all the items in the map and sets the counter. This operation\ncan be very heavy, so use with caution.</p>\n<p>Returns the number of items in the map which is used to set the counter.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.count\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">count</a>() -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a></h4></section></summary><div class=\"docblock\"><p>Return the count.</p>\n</div></details></div></details>",0,"pallet_gear_messenger::pallet::Dispatches"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"impl\"><a href=\"#impl-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt; CountedStorageMap&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt;<div class=\"where\">where\n    Prefix: CountedStorageMapInstance,\n    Hasher: StorageHasher + ReversibleStorageHasher,\n    Key: FullCodec,\n    Value: FullCodec,\n    QueryKind: QueryKindTrait&lt;Value, OnEmpty&gt;,\n    OnEmpty: Get&lt;&lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query&gt; + 'static,\n    MaxValues: Get&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>&gt;&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.iter\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">iter</a>() -&gt; PrefixIterator&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.tuple.html\">(Key, Value)</a>, OnRemovalCounterUpdate&lt;Prefix&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Enumerate all elements in the map in no particular order.</p>\n<p>If you alter the map while doing this, you’ll get undefined results.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.drain\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">drain</a>() -&gt; PrefixIterator&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.tuple.html\">(Key, Value)</a>, OnRemovalCounterUpdate&lt;Prefix&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Remove all elements from the map and iterate through them in no particular order.</p>\n<p>If you add elements to the map while doing this, you’ll get undefined results.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.translate\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">translate</a>&lt;O, F&gt;(f: F)<div class=\"where\">where\n    O: Decode,\n    F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/function/trait.FnMut.html\" title=\"trait core::ops::function::FnMut\">FnMut</a>(Key, O) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Value&gt;,</div></h4></section></summary><div class=\"docblock\"><p>Translate the values of all elements by a function <code>f</code>, in the map in no particular order.</p>\n<p>By returning <code>None</code> from <code>f</code> for an element, you’ll remove it from the map.</p>\n<p>NOTE: If a value fail to decode because storage is corrupted then it is skipped.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.iter_from\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">iter_from</a>(\n    starting_raw_key: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u8.html\">u8</a>&gt;\n) -&gt; PrefixIterator&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.tuple.html\">(Key, Value)</a>, OnRemovalCounterUpdate&lt;Prefix&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Enumerate all elements in the counted map after a specified <code>starting_raw_key</code> in no\nparticular order.</p>\n<p>If you alter the map while doing this, you’ll get undefined results.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.iter_keys\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">iter_keys</a>() -&gt; KeyPrefixIterator&lt;Key&gt;</h4></section></summary><div class=\"docblock\"><p>Enumerate all keys in the counted map.</p>\n<p>If you alter the map while doing this, you’ll get undefined results.</p>\n</div></details></div></details>",0,"pallet_gear_messenger::pallet::Dispatches"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-StorageInfoTrait-for-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"impl\"><a href=\"#impl-StorageInfoTrait-for-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt; StorageInfoTrait for CountedStorageMap&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt;<div class=\"where\">where\n    Prefix: CountedStorageMapInstance,\n    Hasher: StorageHasher,\n    Key: FullCodec + MaxEncodedLen,\n    Value: FullCodec + MaxEncodedLen,\n    QueryKind: QueryKindTrait&lt;Value, OnEmpty&gt;,\n    OnEmpty: Get&lt;&lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query&gt; + 'static,\n    MaxValues: Get&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>&gt;&gt;,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.storage_info\" class=\"method trait-impl\"><a href=\"#method.storage_info\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">storage_info</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;StorageInfo&gt;</h4></section></div></details>","StorageInfoTrait","pallet_gear_messenger::pallet::Dispatches"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialStorageInfoTrait-for-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"impl\"><a href=\"#impl-PartialStorageInfoTrait-for-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt; PartialStorageInfoTrait for CountedStorageMap&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt;<div class=\"where\">where\n    Prefix: CountedStorageMapInstance,\n    Hasher: StorageHasher,\n    Key: FullCodec,\n    Value: FullCodec,\n    QueryKind: QueryKindTrait&lt;Value, OnEmpty&gt;,\n    OnEmpty: Get&lt;&lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query&gt; + 'static,\n    MaxValues: Get&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>&gt;&gt;,</div></h3></section></summary><div class=\"docblock\"><p>It doesn’t require to implement <code>MaxEncodedLen</code> and give no information for <code>max_size</code>.</p>\n</div><div class=\"impl-items\"><section id=\"method.partial_storage_info\" class=\"method trait-impl\"><a href=\"#method.partial_storage_info\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">partial_storage_info</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;StorageInfo&gt;</h4></section></div></details>","PartialStorageInfoTrait","pallet_gear_messenger::pallet::Dispatches"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-StorageEntryMetadataBuilder-for-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"impl\"><a href=\"#impl-StorageEntryMetadataBuilder-for-CountedStorageMap%3CPrefix,+Hasher,+Key,+Value,+QueryKind,+OnEmpty,+MaxValues%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt; StorageEntryMetadataBuilder for CountedStorageMap&lt;Prefix, Hasher, Key, Value, QueryKind, OnEmpty, MaxValues&gt;<div class=\"where\">where\n    Prefix: CountedStorageMapInstance,\n    Hasher: StorageHasher,\n    Key: FullCodec + StaticTypeInfo,\n    Value: FullCodec + StaticTypeInfo,\n    QueryKind: QueryKindTrait&lt;Value, OnEmpty&gt;,\n    OnEmpty: Get&lt;&lt;QueryKind as QueryKindTrait&lt;Value, OnEmpty&gt;&gt;::Query&gt; + 'static,\n    MaxValues: Get&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.u32.html\">u32</a>&gt;&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.build_metadata\" class=\"method trait-impl\"><a href=\"#method.build_metadata\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">build_metadata</a>(\n    docs: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;&amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.str.html\">str</a>&gt;,\n    entries: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;StorageEntryMetadataIR&gt;\n)</h4></section></summary><div class='docblock'>Build into <code>entries</code> the storage metadata entries of a storage given some <code>docs</code>.</div></details></div></details>","StorageEntryMetadataBuilder","pallet_gear_messenger::pallet::Dispatches"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()