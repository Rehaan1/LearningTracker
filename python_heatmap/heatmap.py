import pandas as pd
import calplot
import matplotlib.pyplot as plt

# @TODO Get this Dyanmically
dates = ["2023-01-26T16:03:44.734Z", "2023-01-26T16:04:18.433Z", "2023-01-26T16:04:34.439Z", "2023-01-26T16:05:17.770Z", "2023-01-26T16:05:41.772Z", "2023-01-26T16:05:56.948Z", "2023-01-26T16:08:04.749Z", "2023-01-27T17:07:37.917Z"]
sites = ["www.udemy.com", "www.udemy.com", "www.udemy.com", "www.udemy.com", "www.udemy.com", "www.udemy.com", "learn.unity.com", "learn.unity.com"]


def create_heatmap():
    data = {
            'Dates' : dates,
            'Sites' : sites
            }

    df = pd.DataFrame(data)

    #change the type of data
    df['Dates'] = pd.to_datetime(df['Dates'])
    df['Dates'] = df['Dates'].apply(lambda x: str(x).split(' ')[0])

    #Item Count of each date
    item_counts = df['Dates'].value_counts()

    #Create new DataFrame for heatmap Data
    uniqueDates = list()
    counts =  list()
    heatmapData = dict()

    for a,b in item_counts.items():
        uniqueDates.append(a)
        counts.append(b)

    heatmapData['Date'] = uniqueDates
    heatmapData['Count'] = counts

    #Create Python DataFrame
    df2 = pd.DataFrame(heatmapData)
    df2['Date'] = pd.to_datetime(df2['Date']) 

    #Set dates as index
    df2.set_index('Date', inplace=True)

    #Create the Calendar Heatmap
    plot = calplot.calplot(df2['Count'], how="sum", cmap='YlGn')

    #plt.show()

    #Save the calendar heatmap
    plt.savefig('./user_heatmaps/heatmap.jpg')

    print('{\"code\":\"200\",\"status\":\"sucess\"}')