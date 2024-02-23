import datetime

import six
import typing
import time
import string
from swagger_server import type_util


def _deserialize(data, klass):
    """Deserializes dict, list, str into an object.

    :param data: dict, list or str.
    :param klass: class literal, or string of class name.

    :return: object.
    """
    if data is None:
        return None

    if klass in six.integer_types or klass in (float, str, bool, bytearray):
        return _deserialize_primitive(data, klass)
    elif klass == object:
        return _deserialize_object(data)
    elif klass == datetime.date:
        return deserialize_date(data)
    elif klass == datetime.datetime:
        return deserialize_datetime(data)
    elif type_util.is_generic(klass):
        if type_util.is_list(klass):
            return _deserialize_list(data, klass.__args__[0])
        if type_util.is_dict(klass):
            return _deserialize_dict(data, klass.__args__[1])
    else:
        return deserialize_model(data, klass)


def _deserialize_primitive(data, klass):
    """Deserializes to primitive type.

    :param data: data to deserialize.
    :param klass: class literal.

    :return: int, long, float, str, bool.
    :rtype: int | long | float | str | bool
    """
    try:
        value = klass(data)
    except UnicodeEncodeError:
        value = six.u(data)
    except TypeError:
        value = data
    return value


def _deserialize_object(value):
    """Return an original value.

    :return: object.
    """
    return value


def deserialize_date(string):
    """Deserializes string to date.

    :param string: str.
    :type string: str
    :return: date.
    :rtype: date
    """
    try:
        from dateutil.parser import parse
        return parse(string).date()
    except ImportError:
        return string


def deserialize_datetime(string):
    """Deserializes string to datetime.

    The string should be in iso8601 datetime format.

    :param string: str.
    :type string: str
    :return: datetime.
    :rtype: datetime
    """
    try:
        from dateutil.parser import parse
        return parse(string)
    except ImportError:
        return string


def deserialize_model(data, klass):
    """Deserializes list or dict to model.

    :param data: dict, list.
    :type data: dict | list
    :param klass: class literal.
    :return: model object.
    """
    instance = klass()

    if not instance.swagger_types:
        return data

    for attr, attr_type in six.iteritems(instance.swagger_types):
        if data is not None \
                and instance.attribute_map[attr] in data \
                and isinstance(data, (list, dict)):
            value = data[instance.attribute_map[attr]]
            setattr(instance, attr, _deserialize(value, attr_type))

    return instance


def _deserialize_list(data, boxed_type):
    """Deserializes a list and its elements.

    :param data: list to deserialize.
    :type data: list
    :param boxed_type: class literal.

    :return: deserialized list.
    :rtype: list
    """
    return [_deserialize(sub_data, boxed_type)
            for sub_data in data]


def _deserialize_dict(data, boxed_type):
    """Deserializes a dict and its elements.

    :param data: dict to deserialize.
    :type data: dict
    :param boxed_type: class literal.

    :return: deserialized dict.
    :rtype: dict
    """
    return {k: _deserialize(v, boxed_type)
            for k, v in six.iteritems(data)}


def generate_custom_id(id_type, last_sequence):
    """
    Generates a custom ID consisting of a random 5-character alphanumeric
    string and a timestamp in milliseconds (UTC).

    Returns:
        str: A string representing the custom ID in the format
        'id_type{last_sequence_string+1}T{timestamp}'.
    """
    sequence = int(last_sequence) + 1
    
    return {
        "id": f'{id_type}{sequence}',
        "updatedSequence": sequence,
    }


def generate_receipt_id(id_type, last_sequence):
    """
    Generates a custom ID consisting of a random 5-character alphanumeric
    string and a timestamp in milliseconds (UTC).

    Returns:
        str: A string representing the custom ID in the format
        'id_type{last_sequence_string+1}T{timestamp}'.
    """
    sequence = int(last_sequence) + 1
    sequence = str(sequence).zfill(6)

    return {
        "id": f'{id_type}{sequence}',
        "updatedSequence": sequence,
    }
    


def snake_to_camel(data):
    """
    Converts a Python dictionary with snake casing to camel case.

    :param data: The dictionary to be converted.
    :type data: dict
    :return: The converted dictionary.
    :rtype: dict
    """
    def to_camel(s):
        parts = iter(s.split("_"))
        return next(parts) + "".join(i.title() for i in parts)

    def convert(obj):
        if isinstance(obj, list):
            return [convert(item) for item in obj]
        elif isinstance(obj, dict):
            return {to_camel(key): convert(value) for key, value in obj.items()}
        else:
            return obj

    return convert(data)